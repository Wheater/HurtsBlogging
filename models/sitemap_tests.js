var sitemap = require('./sitemap.js');

exports.testDateTime = function(test){
	//number of tests to expect
	test.expect(1);
	//tests true/false
	test.ok(true, "this assertion should pass");
	//test.equal -- shallow  equality ==
	//test.notEqual
	//test.deepEqual 
	//test.notDeepEqual 
	//test.strictEqual ===
	//test.notStrictEqual !==
	//test.throws
	//test.doesNotThrow
	//test.ifError
	//test.done must be called for all tests
	test.done();
};

var newData = '<url><loc>http://hurtsblogging.com/views/singlePost/6/test-test</loc><lastmod>2015-08-10T03:35:15+00:00</lastmod></url><url><loc>http://hurtsblogging.com/views/singlePost/8/test-test</loc><lastmod>2015-08-10T03:35:15+00:00</lastmod></url>';
var data = '<url><loc>http://hurtsblogging.com/views/singlePost/6/test-test</loc><lastmod>2015-08-10T03:35:15+00:00</lastmod></url><url><loc>http://hurtsblogging.com/views/singlePost/8/test-test</loc><lastmod>2015-08-10T03:35:15+00:00</lastmod></url><url><loc>http://hurtsblogging.com/views/singlePost/10/test-test</loc><lastmod>2015-08-10-T03:35:15+00:00</lastmod></url>';
exports.updateDataTest = function(test){
	var result = sitemap.updateData(0, 10, data);
	console.log(result);	
	//come back to this later.
	test.equal(result
					  , newData
					  , "given a match, should remove the url");
	test.done();
}

exports.getLastModTest = function(test){
	//SHOULD NOT PASS...hard to test exact datetime
	//more thought required here...
	test.equal(sitemap.getLastMod(new Date(2015, 07, 10, 03, 35, 15))
				, '<lastmod>2015-08-10T03:35:15+00:00</lastmod>'
				, "last mod xml");
	//should return current date basically
	test.notEqual(sitemap.getLastMod(null)
				, '<lastmod>2015-08-10T03:35:15+00:00</lastmod>'
				, "null date");
	test.done();
}

exports.getLocTest = function(test){
	test.equal(sitemap.getLoc('singlePost', 10, 'test-test')
		     , '<loc>http://hurtsblogging.com/views/singlePost/10/test-test</loc>'
		     , 'returns valid loc entry');
	//throws has to call a function from a function block --LAME
	test.throws(function(){sitemap.getLoc(null, 10, 'test-test');}, "no type provided", "no type throws exception");
	test.throws(function(){sitemap.getLoc('singlePost', -10, 'test-test')}, "no id provided", "no id throws exception");
	test.throws(function(){sitemap.getLoc('singlePost', null, 'test-test')}, "no id provided", "no id throws exception");
	test.done();
}
/*
 * add tests here...
 */
exports.getNewFileDataTest = function(test){
	test.equal(sitemap.getNewFileData('singlePost', 10, xmlFile, new Date(2015, 07, 10, 03, 35, 15), 'test-test')
			 , correctXmlFile
			 , "splicing in new url should return correct url");
	test.done();
}

exports.padFrontTest = function(test){
	test.equal(sitemap.padFront(10), 10, "should not pad");
	test.equal(sitemap.padFront(9), '09', "should pad front");
	test.done();
}

//used for getNewFileDataTest
var xmlFile = '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9  http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"><!-- created with Free Online Sitemap Generator www.xml-sitemaps.com --><url><loc>http://hurtsblogging.com/</loc><lastmod>2015-08-10T03:35:15+00:00</lastmod></url><url><loc>http://hurtsblogging.com/views/home</loc><lastmod>2015-08-10T03:35:15+00:00</lastmod></url><url>  <loc>http://hurtsblogging.com/views/software</loc>  <lastmod>2015-08-10T03:35:15+00:00</lastmod></url><url>  <loc>http://hurtsblogging.com/views/family</loc>  <lastmod>2015-08-10T03:35:15+00:00</lastmod></url><url>  <loc>http://hurtsblogging.com/views/about</loc>  <lastmod>2015-08-10T03:35:15+00:00</lastmod></url><url>  <loc>http://hurtsblogging.com/views/newPost</loc>  <lastmod>2015-08-10T03:35:15+00:00</lastmod></url><url>  <loc>http://hurtsblogging.com/views/login</loc>  <lastmod>2015-08-10T03:35:15+00:00</lastmod></url><url>  <loc>http://hurtsblogging.com/views/singlePost/6/test-test</loc>  <lastmod>2015-08-10T03:35:15+00:00</lastmod></url><url>  <loc>http://hurtsblogging.com/views/singlePost/8/test-test</loc>  <lastmod>2015-08-10T03:35:15+00:00</lastmod></url><url>  <loc>http://hurtsblogging.com/views/singlePost/10/test-test</loc>  <lastmod>2015-08-10T03:35:15+00:00</lastmod></url></urlset>';
var correctXmlFile = '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9  http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"><!-- created with Free Online Sitemap Generator www.xml-sitemaps.com --><url><loc>http://hurtsblogging.com/</loc><lastmod>2015-08-10T03:35:15+00:00</lastmod></url><url><loc>http://hurtsblogging.com/views/home</loc><lastmod>2015-08-10T03:35:15+00:00</lastmod></url><url>  <loc>http://hurtsblogging.com/views/software</loc>  <lastmod>2015-08-10T03:35:15+00:00</lastmod></url><url>  <loc>http://hurtsblogging.com/views/family</loc>  <lastmod>2015-08-10T03:35:15+00:00</lastmod></url><url>  <loc>http://hurtsblogging.com/views/about</loc>  <lastmod>2015-08-10T03:35:15+00:00</lastmod></url><url>  <loc>http://hurtsblogging.com/views/newPost</loc>  <lastmod>2015-08-10T03:35:15+00:00</lastmod></url><url>  <loc>http://hurtsblogging.com/views/login</loc>  <lastmod>2015-08-10T03:35:15+00:00</lastmod></url><url>  <loc>http://hurtsblogging.com/views/singlePost/6/test-test</loc>  <lastmod>2015-08-10T03:35:15+00:00</lastmod></url><url>  <loc>http://hurtsblogging.com/views/singlePost/8/test-test</loc>  <lastmod>2015-08-10T03:35:15+00:00</lastmod></url><url>  <loc>http://hurtsblogging.com/views/singlePost/10/test-test</loc>  <lastmod>2015-08-10T03:35:15+00:00</lastmod></url><url><loc>http://hurtsblogging.com/views/singlePost/10/test-test</loc><lastmod>2015-08-10T03:35:15+00:00</lastmod></url></urlset>';