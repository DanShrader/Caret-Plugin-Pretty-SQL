var caretId = "fljalecfjciodhpcledpamjachpmelml";
var sendToCaret = function (command, argument, quiet) {
	var message = {
		command: command,
		argument: argument,
		quiet: quiet
	};
	chrome.runtime.sendMessage(caretId, message);
};
chrome.runtime.onMessageExternal.addListener(
	function (message, sender, sendResponse) {
		var data = message.context.selection;
		var options = message.options || {};
		var command = message.command || 'none';
		// The words are from the sql-formatter libary
		// https://github.com/zeroturnaround/sql-formatter
		var reservedWords = ["ALL", "ALTER", "ANALYZE", "AND", "ANY", "ARRAY", "AS", "ASC", "BEGIN", "BETWEEN", "BINARY", "BOOLEAN", "BREAK", "BUCKET", "BUILD", "BY", "CALL", "CASE", "CAST", "CLUSTER", "COLLATE", "COLLECTION", "COMMIT", "CONNECT", "CONTINUE", "CORRELATE", "COVER", "CREATE", "DATABASE", "DATASET", "DATASTORE", "DECLARE", "DECREMENT", "DELETE", "DERIVED", "DESC", "DESCRIBE", "DISTINCT", "DO", "DROP", "EACH", "ELEMENT", "ELSE", "END", "EVERY", "EXCEPT", "EXCLUDE", "EXECUTE", "EXISTS", "EXPLAIN", "FALSE", "FETCH", "FIRST", "FLATTEN", "FOR", "FORCE", "FROM", "FUNCTION", "GRANT", "GROUP", "GSI", "HAVING", "IF", "IGNORE", "ILIKE", "IN", "INCLUDE", "INCREMENT", "INDEX", "INFER", "INLINE", "INNER", "INSERT", "INTERSECT", "INTO", "IS", "JOIN", "KEY", "KEYS", "KEYSPACE", "KNOWN", "LAST", "LEFT", "LET", "LETTING", "LIKE", "LIMIT", "LSM", "MAP", "MAPPING", "MATCHED", "MATERIALIZED", "MERGE", "MINUS", "MISSING", "NAMESPACE", "NEST", "NOT", "NULL", "NUMBER", "OBJECT", "OFFSET", "ON", "OPTION", "OR", "ORDER", "OUTER", "OVER", "PARSE", "PARTITION", "PASSWORD", "PATH", "POOL", "PREPARE", "PRIMARY", "PRIVATE", "PRIVILEGE", "PROCEDURE", "PUBLIC", "RAW", "REALM", "REDUCE", "RENAME", "RETURN", "RETURNING", "REVOKE", "RIGHT", "ROLE", "ROLLBACK", "SATISFIES", "SCHEMA", "SELECT", "SELF", "SEMI", "SET", "SHOW", "SOME", "START", "STATISTICS", "STRING", "SYSTEM", "THEN", "TO", "TRANSACTION", "TRIGGER", "TRUE", "TRUNCATE", "UNDER", "UNION", "UNIQUE", "UNKNOWN", "UNNEST", "UNSET", "UPDATE", "UPSERT", "USE", "USER", "USING", "VALIDATE", "VALUE", "VALUED", "VALUES", "VIA", "VIEW", "WHEN", "WHERE", "WHILE", "WITH", "WITHIN", "WORK", "XOR", "DELETE FROM", "EXCEPT ALL", "EXCEPT", "EXPLAIN DELETE FROM", "EXPLAIN UPDATE", "EXPLAIN UPSERT", "FROM", "GROUP BY", "HAVING", "INFER", "INSERT INTO", "INTERSECT ALL", "INTERSECT", "LET", "LIMIT", "MERGE", "NEST", "ORDER BY", "PREPARE", "SELECT", "SET CURRENT SCHEMA", "SET SCHEMA", "SET", "UNION ALL", "UNION", "UNNEST", "UPDATE", "UPSERT", "USE KEYS", "VALUES", "WHERE", "AND", "INNER JOIN", "JOIN", "LEFT JOIN", "LEFT OUTER JOIN", "OR", "OUTER JOIN", "RIGHT JOIN", "RIGHT OUTER JOIN", "XOR"];
		var DAXreservedWords = ["ACOS", "ACOSH", "ADDCOLUMNS", "ADDMISSINGITEMS", "ALL", "ALLEXCEPT", "ALLNOBLANKROW", "ALLSELECTED", "AND", "ASIN", "ASINH", "ATAN", "ATANH", "AVERAGE", "AVERAGEA", "AVERAGEX", "BETA.DIST", "BETA.INV", "BLANK", "CALCULATE", "CALCULATETABLE", "CALENDAR", "CALENDARAUTO", "CEILING", "CHISQ.INV", "CHISQ.INV.RT", "CLOSINGBALANCEMONTH", "CLOSINGBALANCEQUARTER", "CLOSINGBALANCEYEAR", "CODE", "COMBIN", "COMBINA", "CONCATENATE", "CONCATENATEX", "CONFIDENCE.NORM", "CONFIDENCE.T", "CONTAINS", "COS", "COSH", "COUNT", "COUNTA", "COUNTAX", "COUNTBLANK", "COUNTROWS", "COUNTX", "CROSSFILTER Function", "CROSSJOIN", "CURRENCY", "CUSTOMDATA", "DATATABLE Function", "DATE", "DATEADD", "DATEDIFF", "DATESBETWEEN", "DATESINPERIOD", "DATESMTD", "DATESQTD", "DATESYTD", "DATEVALUE", "DAY", "DEGREES", "DISTINCT", "DISTINCTCOUNT", "DIVIDE", "EARLIER", "EARLIEST", "EDATE", "ENDOFMONTH", "ENDOFQUARTER", "ENDOFYEAR", "EOMONTH", "EVEN", "EXACT", "EXCEPT", "EXP", "EXPON.DIST", "FACT", "FILTER", "FILTERS", "FIND", "FIRSTDATE", "FIRSTNONBLANK", "FIXED", "FLOOR", "FORMAT", "GCD", "GENERATE", "GENERATEALL", "GEOMEAN", "GEOMEANX", "GROUPBY", "HASONEFILTER", "HASONEVALUE", "HOUR", "IF", "IFERROR", "INT", "INTERSECT", "ISBLANK", "ISCROSSFILTERED", "ISEMPTY", "ISERROR", "ISEVEN", "ISFILTERED", "ISLOGICAL", "ISNONTEXT", "ISNUMBER", "ISO.CEILING", "ISONORAFTER", "ISTEXT", "KEEPFILTERS", "LASTDATE", "LASTNONBLANK", "LCMLCM", "LEFT", "LEN", "LN", "LOG", "LOG10", "LOOKUPVALUE", "LOWER", "MAX", "MAXA", "MAXX", "MEDIAN", "MEDIANX", "MID", "MIN", "MINA", "MINUTE", "MINX", "MONTH", "MROUND", "NATURALINNERJOIN", "NATURALLEFTOUTERJOIN", "NEXTDAY", "NEXTMONTH", "NEXTQUARTER", "NEXTYEAR", "NOT", "NOW", "ODD", "OPENINGBALANCEMONTH", "OPENINGBALANCEQUARTER", "OPENINGBALANCEYEAR", "OR", "PARALLELPERIOD", "PATH", "PATHCONTAINS", "PATHITEM", "PATHITEMREVERSE", "PATHLENGTH", "PERCENTILE.EXC", "PERCENTILE.INC", "PERCENTILEX.EXC", "PERCENTILEX.INC", "PI", "POISSON.DIST", "POWER", "PREVIOUSDAY", "PREVIOUSMONTH", "PREVIOUSQUARTER", "PREVIOUSYEAR", "PRODUCT", "PRODUCTX", "QUOTIENT", "RADIANS", "RAND", "RANDBETWEEN", "RANK.EQ", "RANKX", "RELATED", "RELATEDTABLE", "REPLACE", "REPT", "RETURN", "RIGHT", "ROUND", "ROUNDDOWN", "ROUNDUP", "ROW", "SAMEPERIODLASTYEAR", "SAMPLE", "SEARCH", "SECOND", "SELECTCOLUMNS", "SIGN", "SIN", "SINH", "SQRT", "SQRTPI", "STARTOFMONTH", "STARTOFQUARTER", "STARTOFYEAR", "STDEV.P", "STDEV.S", "STDEVX.P", "STDEVX.S", "SUBSTITUTE", "SUBSTITUTEWITHINDEX", "SUM", "SUMMARIZE", "SUMMARIZECOLUMNS", "SUMX", "SWITCH", "TAN", "TANH", "TIME", "TIMEVALUE", "TODAY", "TOPN", "TOTALMTD", "TOTALQTD", "TOTALYTD", "TRIM", "TRUNC", "UNION", "UPPER", "USERELATIONSHIP", "USERNAME", "VALUE", "VALUES", "VAR", "VAR.P", "VAR.S", "VARX.P", "VARX.S", "WEEKDAY", "WEEKNUM", "XIRR", "XNPV", "YEAR", "YEARFRAC", "FALSE", "TRUE"];
		var returnData = "";
		var dataArray = [];
		if (command === "sql-format") {
			// To mank it easier
			data = data.replace(/,/g, " , ");
			// make sure the comments stay right
			data = data.replace(/(?:\r\n|\r|\n)/g, ' ReturnLinePlaceHolder ');
			dataArray = data.split(" ");
			dataArray.forEach(function (word, index) {
				if (reservedWords.indexOf((word.toLocaleUpperCase()).trim()) > -1) {
					dataArray[index] = word.toLocaleUpperCase();
				}
			});
			data = dataArray.join(" ");
			data = data.replace(/ReturnLinePlaceHolder/g, '\n');
			returnData = sqlFormatter.format(data, options);
			sendToCaret('editor:insert', returnData, true);
		}
		if (command === "dax-format") {
			// To mank it easier
			data = data.replace(/,/g, " , ");
			data = data.replace(/=/g, " = ");
			data = data.replace(/\/\//g, "--");
			// make sure the comments stay right
			data = data.replace(/(?:\r\n|\r|\n)/g, ' ReturnLinePlaceHolder ');
			data = data.replace(/[{(}]/g, ' (');
			dataArray = data.split(" ");
			dataArray.forEach(function (word, index) {
				// if (reservedWords.indexOf((word.toLocaleUpperCase()).trim()) > -1) {
				// dataArray[index] = word.toLocaleUpperCase();
				// }
				if (DAXreservedWords.indexOf((word.toLocaleUpperCase()).trim()) > -1) {
					dataArray[index] = word.toLocaleUpperCase();
				}
			});
			data = dataArray.join(" ");
			data = data.replace(/ReturnLinePlaceHolder/g, '\n');
			returnData = sqlFormatter.format(data, options);
			returnData = returnData.replace(/--/g, "//");
			returnData = returnData.replace(/& &/g, "&&");
			returnData = returnData.replace(/: =/g, ":=");
			// Easy removal of hte 'space'
			returnData = returnData.split(" (");
			returnData = returnData.join("(");
			returnData = returnData.replace("= ", "=\n"); //only the first
			returnData = returnData.replace("RETURN ", "\nRETURN\n");
			returnData = returnData.replace(/VAR/g, '\nVAR');
			returnData = returnData.replace(/\t\nVAR/g, "\tVAR");
			returnData = returnData.replace(/=\n\nVAR/g, "=\nVAR");
			returnData = returnData.replace("\n\n", "\n");
			sendToCaret('editor:insert', returnData, true);
		}
	});