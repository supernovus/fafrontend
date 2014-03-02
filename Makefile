.PHONY: deps app all clean distclean
.DEFAULT: all

OUR_SOURCES = htdocs/scripts/frontend.min.js htdocs/style/frontend.min.css htdocs/index.html

EXT_DEPENDS = htdocs/scripts/jquery.min.js htdocs/scripts/riot.min.js htdocs/scripts/moment.min.js htdocs/scripts/semantic.min.js

all: deps app
app: $(OUR_SOURCES) 
deps: $(EXT_DEPENDS)

JQUERY_URL = http://code.jquery.com/jquery-2.1.0.min.js
RIOT_URL   = https://raw.github.com/moot/riotjs/master/riot.min.js
MOMENT_URL = http://momentjs.com/downloads/moment.min.js
SUI_FILE   = semantic.zip
SUI_URL    = http://semantic-ui.com/build/semantic.zip

htdocs:
	mkdir -v htdocs

htdocs/scripts: htdocs
	mkdir -v htdocs/scripts

htdocs/style: htdocs
	mkdir -v htdocs/style

htdocs/images: htdocs
	mkdir -v htdocs/images

htdocs/scripts/jquery.min.js: htdocs/scripts
	wget -O $@ $(JQUERY_URL)

htdocs/scripts/riot.min.js: htdocs/scripts
	wget -O $@ $(RIOT_URL)

htdocs/scripts/moment.min.js: htdocs/scripts
	wget -O $@ $(MOMENT_URL)

htdocs/scripts/frontend.min.js: htdocs/scripts/frontend.js
	uglifyjs $< -o $@

htdocs/scripts/frontend.js: htdocs/scripts
	@ cat js/header.js.inc > $@
	@ cat js/base/*.js >> $@
	@ cat js/base/api/*.js >> $@
	@ cat js/base/backend/*.js >> $@
	@ cat js/ux/*.js >> $@
	@ cat js/init.js >> $@
	@ cat js/footer.js.inc > $@

htdocs/style/frontend.min.css: htdocs/style/frontend.css
	uglifycss $< > $@

htdocs/style/frontend.css: htdocs/style
	@ cat css/base.css > $@
	@ cat css/ui/*.css >> $@

htdocs/index.html: htdocs
	@ cat html/header.html > $@
	@ cat html/ui/*.html >> $@
	@ cat html/footer.html >> $@

htdocs/scripts/semantic.min.js: htdocs/scripts htdocs/style htdocs/images
	## This actually does a lot more than just semantic.min.js
	wget $(SUI_URL)
	unzip $(SUI_FILE) -d .build
	mkdir -p htdocs/scripts htdocs/style htdocs/images
	mv -v .build/packaged/javascript/semantic.min.js htdocs/scripts/
	mv -v .build/packaged/css/semantic.min.css htdocs/style/
	mv -v .build/packaged/images/*.gif htdocs/images/
	mv -v .build/packaged/fonts htdocs/
	rm -rv .build
	rm -v $(SUI_FILE)

clean:
	rm -fv htdocs/scripts/frontend.js
	rm -fv htdocs/style/frontend.css
	rm -fv $(OUR_SOURCES)

distclean:
	rm -rv htdocs/

