
# Bambulabs printers (X1C and two P1S's (red and white))

Vi har hittat ett bibliotek för att hämta kamera bilder live från p-serien och x-serien (med en egengjord adapter för att hämta varje "frame" i videon och visa upp dem en efter en (i ungefär 24 frames/second) för att undvika krockar med p-serien då dem skickar bilder på det sättet istället för en ren video), vilket sedan skickas till våran hub som visar upp. Koden använder printerns ip address och accesskod (båda hittas på printern) för att göra en koppling till printern genom mqtt protokollet, vilket tillåter datorn att hämta bilder från kameran direkt och visa upp det
## Helpful sources:

https://wiki.bambulab.com/en/software/bambu-studio/virtual-camera

# Prusa (SL1S)

För att hubben ska göra en koppling till en prusa printer används **PrusaLink** vilket är en färdig-gjord api som kommer standard med den modellen, för att göra ett request så behöver man ange användarnamn, lösenord och ip-addressen till printern i requestet. Nedan är ett exempel samt lite dokumentering om api endpoints i prusa link:

**Req.ex:** curl --digest -u "username:password" http://printer-ip/api/api-endpoint
**API endpoints:** job, printer, version, status, storage, info
**Note:** status, storage och info verkar behöva ett /v1/ imellan api och endpointen i GET requestet (till exempel /api/v1/status funkar men inte /api/status). job, version och printer behöver ej detta

Vi har skapat ett bibliotek för denna koppling vilket är det hubben använder för att göra en koppling via **prusa link**, eftersom att prusa modellen inte har en kamera så skickas bara data (som status, temperatur, utrymme etc...) vilket hubben hämtar upp och visar.

https://help.prusa3d.com/article/prusa-connect-and-prusalink-explained_302608