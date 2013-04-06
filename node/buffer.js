var assert = require("assert");

var buffer = new Buffer(1024);
assert.equal(1024, buffer.length, "Buffer(length) test");

buffer = new Buffer([ 48, 49, 50, 51 ]);
assert.equal("0123", buffer.toString("ascii"), "Buffer(array) & toString(encoding)");

buffer = new Buffer("abcd", "utf-8");
assert.equal("abcd", buffer.toString("utf-8"),"Buffer(str, encoding)");

assert(Buffer.isEncoding("utf-8"),"Buffer.isEncoding utf-8");
assert(!Buffer.isEncoding("gbk"),"Buffer.isEncoding gbk"); // does not support gbk?

assert(Buffer.isEncoding("ascii"),"Buffer.isEncoding ascii");
assert(Buffer.isEncoding("utf16le"),"Buffer.isEncoding utf16le");
assert(Buffer.isEncoding("ucs2"),"Buffer.isEncoding ucs2");
assert(Buffer.isEncoding("base64"),"Buffer.isEncoding base64");
assert(Buffer.isEncoding("binary"),"Buffer.isEncoding binary");
assert(Buffer.isEncoding("hex"),"Buffer.isEncoding hex");

buffer = new Buffer(6);
var len = buffer.write("我是123",0,"utf-8");
assert.equal(6, len, "Buffer.write will not pass limit");
assert.equal(2, Buffer._charsWritten, "Buffer.write save Buffer._charsWritten");
assert.equal("我是", buffer.toString("utf-8"),"Buffer write, get back with toString()");

len = buffer.write("12", 3, "utf-8");
assert.equal(2, len, "Buffer.write in middle");
assert.equal(2, Buffer._charsWritten, "Buffer.write save Buffer._charsWritten");
//console.log(buffer.toString("utf-8")); // wrong encoding

assert.equal("我12", buffer.toString("utf-8", 0 , 5), "Buffer.toString(enc, start, end)")

buffer = new Buffer("abcd", "utf-8");
assert.deepEqual([97,98,99,100], buffer.toJSON(),"Buffer.toJSON");

assert.equal("[1,2,34]", JSON.stringify([1,2,34]), "JSON.stringify");

assert.deepEqual([12,34], JSON.parse("[12,34]"),"JSON.parse");

var str = "node.js";
buffer = new Buffer(str.length);

for (var i = 0; i < str.length ; i++) {
  buffer[i] = str.charCodeAt(i);
}
assert.equal("node.js", buffer.toString(), "buf[index] getter & setter");

assert(Buffer.isBuffer(buffer),"Buffer.isBuffer");

assert(14, Buffer.byteLength("我们是20123"),"Buffer.byteLength");

assert.equal("12", Buffer.concat([new Buffer("1"), new Buffer("2")] , 2).toString(), "Buffer.concat" )

buffer = new Buffer(8);
buffer.writeInt16LE(1, 0); // 0x01 0x00
assert.equal(1, buffer.readInt16LE(0), "buf.readInt16LE");
assert.equal(256, buffer.readInt16BE(0), "buf.readInt16BE");

buffer.writeInt32BE(0x01020304, 0);
assert.equal(0x01020304, buffer.readInt32BE(0));
assert.equal(0x04030201, buffer.readInt32LE(0));

buffer = new Buffer(1024);


