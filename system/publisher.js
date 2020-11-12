var mqtt = require('mqtt');
var fakerator = require("fakerator")("en-EN");

const MQTT_SERVER = "192.168.65.1";
const MQTT_PORT = "1883";
//if your server don't have username and password let blank.
const MQTT_USER = ""; 
const MQTT_PASSWORD = "";

// Connect MQTT
var client = mqtt.connect({
    host: MQTT_SERVER,
    port: MQTT_PORT,
    username: MQTT_USER,
    password: MQTT_PASSWORD
});

client.on('connect', function () {
    // Subscribe any topic
    console.log("MQTT Connect");
    client.subscribe('test', function (err) {
        if (err) {
            console.log(err);
        }
    });
});

// สร้างข้อมูล name, country
function get_name_country() {
    var name = fakerator.names.name();
    var country = fakerator.address.country();

    return {name, country};
}

// ส่งข้อมูลขึ้น mqtt ทุก ๆ 5 วินาที
setInterval(() => {
    var data = get_name_country();
    client.publish("test", JSON.stringify(data));
}, 5000);