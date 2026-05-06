
# Att lägga till skrivare:

För att lägga till printers i Prinvue så klickar man på knappen ner till vänster som det står "Lägg till skrivare", det kommer att poppa upp ett pop-up-fönster där du kan skriva in din skrivares detaljer för kopplingen

### Modell:
Välj modell längst upp, clicka på spalten och välj modell på drop-down menyn, alla modeller som prinvue kan koppla sig till finns på listan
### Namn:
här skriver du vad kopplingen ska heta i prinvue, det kan vara vad som helst eftersom att det namnet inte används i kopplingen, det är bara för att namge kopplingen till skrivaren i prinvue
### IP-adress:
här skriver du in ip addressen till skrivaren (säg till så att servern och skrivaren är på samma närverk) för kopplingen, skrivarens ip-address hittar du i själva skrivaren genom skrivarens touch-screen, exakt vart beror på skrivar-modell så om du inte kan hitta ip-addressen så står det längre ner i dokumentet vart man hittar allt i dem olika printers
### Serienummer (serial):
Här skriver du serienummret till skrivaren, det hittas i skrivaren i inställningar oftast bredvid en spalt som heter AMS (obs: det är inte AMS), nummret brukar vara ganska långt. Brukar oftast stå i en spalt vid namn "printer"
### Access Code:
Access koden hittas i inställningar på den fysiska skrivaren oftast på samma ställe som man hittar ip-addressen kan man hitta detta nummer, till skillnad från de andra nummerna så kan detta nummer ändras (t.ex om man startar om printern kan det hända eller om man refreshar access koden manuellt på skrivaren) så det kan vara bra att ha i baktanke ifall någonting går fel med kopplingen

När all information är ifylld så trycker du bara på "spara" knappen och så borde du se din koppling inom kort.

### Username & Password:
Username och password används i t.ex prusor för att komma åt deras api (prusa link) och finns åtkomlig igenom skrivarens touchscreen

## Vart man hittar rätt information på alla modeller:

Om du inte vet vilken modell din skrivare är så brukar det stå någonstans på skrivar-chassit
### Bambulabs P1:
##### IP-adress:
Inställningar > WLAN
##### Serienummer:
inställningar > Device 
##### Accesskod:
inställningar > WLAN
### Bambulabs X1:
##### IP-adress:
Inställningar > Settings > LAN only mode
##### Serienummer:
inställningar > Settings > Device and serial number
##### Accesskod:
Inställningar > Settings > LAN only mode
### Prusa SL1S Speed:
##### IP-adress:
Inställningar > Settings > Network
##### Username:
Inställningar > Settings > Network > Prusa link
##### Password:
Inställningar > Settings > Network > Prusa link