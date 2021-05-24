#include <esp_now.h>
#include <WiFi.h>

uint8_t broadcastAddress[] = {0xAC, 0x67, 0xB2, 0x00, 0x35, 0xC0};

bool buttonState;
bool messageInit;
String serialEntry;
String entryControlMessage;
//String stateON = "on";
//String stateOFF = "off";
int stateON = 1;
int stateOFF = 0;

typedef struct struct_message {
  bool ventStatus;
} struct_message;

struct_message ventData;

void OnDataSent(const uint8_t *mac_addr, esp_now_send_status_t status) {
  Serial.print("\r\nLast Packet Send Status:\t");
  Serial.println(status == ESP_NOW_SEND_SUCCESS ? "Delivery success!" : "Delivery failed!");
}

void setup() {
  WiFi.mode(WIFI_STA);

  Serial.begin(115200);
  WiFi.mode(WIFI_STA);

  if (esp_now_init() != ESP_OK) {
    Serial.println("ERROR initalizing ESP_NOW");
    return;
  }

  esp_now_register_send_cb(OnDataSent);

  esp_now_peer_info_t peerInfo;
  memcpy(peerInfo.peer_addr, broadcastAddress, 6);
  peerInfo.channel = 0;
  peerInfo.encrypt = false;

  if (esp_now_add_peer(&peerInfo) != ESP_OK) {
    Serial.println("Failed to add peer");
    return;
  }

}

void loop() {

  messageInit = false;

  Serial.println("----------------------\n Enter choosen state\n----------------------");
  while (Serial.available() == 0) {}
  serialEntry = Serial.readString();
  Serial.println(serialEntry);

  if (serialEntry.toInt() == stateON) {
    Serial.println("test 1");
    ventData.ventStatus = true;
    buttonState = true;
    messageInit = true;
    entryControlMessage = "Button will be turned on....";
  } else if (serialEntry.toInt() == stateOFF) {
    Serial.println("test 2");
    ventData.ventStatus = false;
    buttonState = false;
    messageInit = true;
    entryControlMessage = "Button will be turned off....";
  } else {
    entryControlMessage = "Entry ERROR!";
    messageInit = false;
  }

  Serial.println(entryControlMessage);

  if (messageInit) {
    esp_err_t result = esp_now_send(broadcastAddress, (uint8_t *) &ventData, sizeof(ventData));

    if (result == ESP_OK) {
      Serial.println("Sent with success");
    } else {
      Serial.println("ERROR sending the data");
    }
    messageInit = false;
  }

}
