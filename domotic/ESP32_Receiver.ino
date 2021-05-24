#include <esp_now.h>
#include <WiFi.h>

//recv: uint8_t broadcastAddress[] = {0x24, 0x6F, 0x28, 0xCF, 0xAF, 0xDC};
//sender: uint8_t broadcastAddress[] = {0xAC, 0x67, 0xB2, 0x00, 0x35, 0xC0};

int relayPin = 0;
bool relayState;
bool buttonStateTemp;

typedef struct struct_message {
  bool ventStatus;
} struct_message;

struct_message ventData;

void OnDataRecv(const uint8_t * mac, const uint8_t *incomingData, int len) {
  memcpy(&ventData, incomingData, sizeof(ventData));
  Serial.print("Bytes received: ");
  Serial.println(len);
  Serial.print("Status: ");
  Serial.println(ventData.ventStatus);
  relayState = ventData.ventStatus;
  
  if (relayState == true) {
  digitalWrite(relayPin, HIGH);
  buttonStateTemp = true;
  Serial.println("\n--------------STATE HIGH\n--------------");
  } else if (relayState == false){
    digitalWrite(relayPin, LOW);
    buttonStateTemp = false;
    Serial.println("\n--------------STATE LOW\n--------------");
  }
}

void setup() {
  Serial.begin(115200);

  WiFi.mode(WIFI_STA);

  // Init ESP-NOW
  if (esp_now_init() != ESP_OK) {
    Serial.println("Error initializing ESP-NOW");
    return;
  }
  
  esp_now_register_recv_cb(OnDataRecv);

  pinMode(relayPin, OUTPUT);

  Serial.println("--------------------------\nStarting with state: ");
  Serial.print(digitalRead(relayPin));
  Serial.println("\n---------------------------------------");

}

void loop() {
  
}
