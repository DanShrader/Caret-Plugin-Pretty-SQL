# Caret-Plugin-Pretty-SQL
This Caret plugin formats SQL and DAX for pretty print

Here's the  [link](https://chrome.google.com/webstore/detail/caret-pluginsql-formatter/dkjokfldmgepembohkgndcmjoggncdgn?utm_source=chrome-app-launcher-search) to the extension on the chrome webstore.

The options for [sql-formatter](https://github.com/zeroturnaround/sql-formatter) are passed via "options"

## To use with Caret

You'll need to add the following to your api.json file, under settings menu.  This plugin
can pass the same options that sql-formatter does in the 'options' tag.  **Note:** The id is the id found under extensions. The one in here is for the plugin on the webstore.

### api.json

```JavaScript
{
	"sampleMessage": {
		"id": "extension id goes here",
		"message": {
			"data": "message can be any JSON object passable to chrome.runtime.sendMessageExternal"
		}
	},
	"format-SQL": {
		"id": "fnkfgnggimkijjldpalcfjfomhipodib",
		"message": {
			"command": "sql-format",
			"options": {
				"indent": "\t"
			}
		},
		"sendEditorContext": true
	},
	"format-DAX": {
		"id": "fnkfgnggimkijjldpalcfjfomhipodib",
		"message": {
			"command": "dax-format",
			"options": {
				"indent": "\t"
			}
		},
		"sendEditorContext": true
	}
}
```

### menus.json

This is optional, but allows the command to be accessable in menu system.

```JavaScript
{
	"label": "Format SQL",
	"command": "api:execute",
	"argument": "format-SQL"
}, {
	"label": "Format DAX",
	"command": "api:execute",
	"argument": "format-DAX"
}
```


## The following have contributed works

Without the following, this plug-in would not exist.  Thanks to their works.

- [Caret](https://github.com/thomaswilburn/Caret)
- [sql-formatter](https://github.com/zeroturnaround/sql-formatter)
- Microsoft for SSAS and DAX
