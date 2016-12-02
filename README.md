Encoder and Decoder nodes for Protocol Buffers. These wrap protobuf.js

Typical example flows would be

Input

MQTT input node -> Protocol Buffers Decoder Node -> Debug logging node

The Protocol buffers decoder node requires the following configuration

- file path to a .proto file to use for decode
- message type to decode

The output will be a Javascript object containing the decoded fields

Output

Injector node -> Protocol Buffers Encoder Node -> MQTT output node

The Protocol buffers decoder node requires the following configuration

- file path to a .proto file to use for encode
- message type to encode

The input to the encoder node must contain payload in JSON format
suitable for encoding using the .proto message definition

e.g.

.proto file

message ApnConfig {
optional string apn = 1;
optional string username = 2;
optional string password = 3;
}

Injector JSON parameter

{ "apn" : "MyAPN", "username" : "MyUserName", "password" : "MyPassword" }

Node configuration would then contain the path to the .proto file 
and the message type would be ApnConfig.

The output to the MQTT output node will contain a byte array payload
for transmission.
