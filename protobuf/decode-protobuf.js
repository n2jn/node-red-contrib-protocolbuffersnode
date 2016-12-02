
module.exports = function(RED) {

    function DecodeProtoBufNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;

	// Extract configuration settings

	if(config.protofile.length == 0)
	  throw ".proto file is not defined";

	node.protofile = config.protofile;

	if(config.messagetype.length == 0)
	  throw "message type is not defined";

	node.messagetype = config.messagetype;

	// Create protocol buffers builder for decode

        var ProtoBuf = require("protobufjs");
        var builder = ProtoBuf.loadProtoFile(node.protofile);

	// Create the appropriate message object for the decode

        var msgTemplate = builder.build(node.messagetype);

        this.on('input', function(msg) {

            // Decode the incoming bytes to the appropriate message object
		
            var mymsg = msgTemplate.decode(msg.payload);

	    // Modify the payload to contain the decoded object

	    msg.payload = mymsg;

	    // Pass it along

            node.send(msg);
        });
    }
    RED.nodes.registerType("decode-protobuf",DecodeProtoBufNode);
}

