
module.exports = function(RED) {

    function EncodeProtoBufNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;

	// Extract configuration settings

	if(config.protofile.length == 0)
	  throw ".proto file is not defined";

	node.protofile = config.protofile;

	if(config.messagetype.length == 0)
	  throw "message type is not defined";

	node.messagetype = config.messagetype;

	// Create protocol buffers builder for encode
        var ProtoBuf = require("protobufjs");
	// Create the configured message type
        var builder = ProtoBuf.loadProtoFile(node.protofile),
		Message = builder.build(node.messagetype);

        this.on('input', function(msg) {

	    // Create an instance of the message from payload containing
            // JSON format data
	    var message = new Message( msg.payload );
	   
	    // Encode the message
	    var byteBuffer = message.encode();

	    var buffer = byteBuffer.toBuffer();
	    
	    // Modify the payload to contain the encoded object
	    msg.payload = buffer;

	    // Pass it along
            node.send(msg);
        });
    }
    RED.nodes.registerType("encode-protobuf",EncodeProtoBufNode);
}

