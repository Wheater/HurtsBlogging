var rss = require('./rss.js');

exports.getUrlTest = function(test){
	test.equal(rss.getUrl(10, 'test test'), 'http://hurtsblogging.com/views/singlePost/10/test-test', 'id + root = correct entry');
	test.throws(function(){rss.getUrl(null, 'test test')}, "no id given", "null id throws");
	test.throws(function(){rss.getUrl(0, 'test test')}, "no id given", "id <= 0 throws");
	test.done();
}

exports.updateDataTest = function(test){
	var result = rss.updateData(0, 10, newFile);
	//come back to this later.
	test.equal(result
					  , shortenedFile
					  , "given a match, should remove the url");
	test.done();
}

exports.generateEntryTest = function(test){
	test.equal(rss.generateEntry('SQL Test Smell', 'Catching SQL errors by code and test smell', 10), url, "url matches given real data");
	test.throws(function(){rss.generateEntry(null, null, null)}, "cannot accepts nulls", "throws given null");
	test.done();
}

exports.getNewFileDataTest = function(test){
	test.equal(rss.getNewFileData('SQL Test Smell', 'Catching SQL errors by code and test smell', 10, xmlFile), newFile, "new file is good given real data");
	test.done();
}

exports.getDescriptionTest = function(test){
	test.equal(rss.getDescription('0123456789012345678901234567890123456789012345678901'), '01234567890123456789012345678901234567890123456789...', "given input over 50 returns 50 chars");
	test.equal(rss.getDescription('0123'), '0123', "input < 50 = input");
	test.done();
}

var url = '<item><title>SQL Test Smell</title><link>http://hurtsblogging.com/views/singlePost/10/SQL-Test-Smell</link><description><![CDATA[<html><body>Catching SQL errors by code and test smell</body></html>]]></description></item>';
var xmlFile = '<?xml version="1.0" encoding="UTF-8" ?><rss version="2.0"><channel><title>Hurts Blogging</title><link>http://www.hurtsblogging.com</link><description>Family and Software Blog</description><item><title>SQL Test Smell</title><link>http://hurtsblogging.com/views/singlePost/10/SQL-Test-Smell</link><description>Catching SQL errors by code and test smell</description></item></channel></rss>';
var newFile = '<?xml version="1.0" encoding="UTF-8" ?><rss version="2.0"><channel><title>Hurts Blogging</title><link>http://www.hurtsblogging.com</link><description>Family and Software Blog</description><item><title>SQL Test Smell</title><link>http://hurtsblogging.com/views/singlePost/10/SQL-Test-Smell</link><description>Catching SQL errors by code and test smell</description></item><item><title>SQL Test Smell</title><link>http://hurtsblogging.com/views/singlePost/10/SQL-Test-Smell</link><description><![CDATA[<html><body>Catching SQL errors by code and test smell</body></html>]]></description></item></channel></rss>';
var shortenedFile = '<?xml version="1.0" encoding="UTF-8" ?><rss version="2.0"><channel><title>Hurts Blogging</title><link>http://www.hurtsblogging.com</link><description>Family and Software Blog</description><item><title>SQL Test Smell</title><link>http://hurtsblogging.com/views/singlePost/10/SQL-Test-Smell</link><description><![CDATA[<html><body>Catching SQL errors by code and test smell</body></html>]]></description></item></channel></rss>';
