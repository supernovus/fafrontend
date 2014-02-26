.PHONY: all clean distclean semantic_ui deps app
.DEFAULT: all

OUR_SOURCES = htdocs/scripts/frontend.js

EXT_DEPENDS = htdocs/scripts/jquery.min.js htdocs/scripts/riot.min.js htdocs/scripts/moment.min.js semantic_ui

all: deps app
app: $(OUR_SOURCES) 
deps: $(EXT_DEPENDS)

JQUERY_URL = http://code.jquery.com/jquery-2.1.0.min.js
RIOT_URL   = https://raw.github.com/moot/riotjs/master/riot.min.js
MOMENT_URL = http://momentjs.com/downloads/moment.min.js
SUI_FILE   = semantic.zip
SUI_URL    = http://semantic-ui.com/build/semantic.zip

htdocs/scripts/jquery.min.js:
	wget -O $@ $(JQUERY_URL)

htdocs/scripts/riot.min.js:
	wget -O $@ $(RIOT_URL)

htdocs/scripts/moment.min.js:
	wget -O $@ $(MOMENT_URL)

htdocs/scripts/frontend.js:
	@ cat lib/header.js.inc > $@
	@ cat lib/base/*.js >> $@
	@ cat lib/app/*.js >> $@
	@ cat lib/footer.js.inc > $@

semantic_ui:
	wget $(SUI_URL)
	unzip $(SUI_FILE) -d .build
	mv -v .build/packaged/javascript/semantic.min.js htdocs/scripts/
	mv -v .build/packaged/css/semantic.min.css htdocs/style/
	mv -v .build/packaged/images/*.gif htdocs/images/
	mv -v .build/packged/fonts htdocs/
	rm -rv .build
	rm -v $(SUI_FILE)

clean:
	rm -v htdocs/scripts/frontend.js

