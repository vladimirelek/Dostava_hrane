APLIKACIJA ZA DOSTAVU HRANE

Web aplikacija koja služi za online naručivanje hrane

INSTALACIJA

Potrebno je instalirati Node.
Nakon preuzimanja aplikacije potrebno je instalirati sve korištene pakete sa naredbom npm i.

Kada to uradimo potrebno je dodati .env.local fajl u glavni folder sa sledećim podacima

 MONGO_URL=mongodb+srv://vladimirelek0:g1uKaIKHvdGcEedB@cluster0.j9gbvup.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
 
 NEXTAUTH_URL="http://localhost:3000/"
 
 SECRET="blablabla"
 
 EDGE_STORE_ACCESS_KEY=UM9b9PgDnObEzUiCdoijUDirDz6YbfnC
 
EDGE_STORE_SECRET_KEY=bwK7vgoSTrrkdt4M4h6WRFltdqA9PbL2busKzwimyoKzROJU

Nakon dodavanja ključeva koji si neophodni za rad aplikacije, potrebno je pokrenuti aplikaciju komandom npm run dev

TEHNOLOGIJE

Next.js

Tailwind CSS

MongoDB

FUKNCIONALNOSTI I KORIŠTENJE

Aplikacija omogućava korisniku da vidi osnovne informacije o poslastičarnici, da napravi nalog i pomoću njega se prijavi. Nakon prijave, korisnik može unositi osnovne informacije o sebi, koje se prilikom svake narudžbe automatski popunjavaju. Artikle može dodavati u korpu, pri čemu ima mogućnost da odabere dodatke u vidu preliva i veličine artikla koji naručuje. Nakon odabira, korisnik može pristupiti korpi gdje se nalaze informacije o dostavi. Poslije naručivanja, ima mogućnost da vidi sve dostave, kao i status plaćanja dostave i osnovne podatke o njoj.

Administrator ima mnogo više funkcionalnosti. On može korisniku dodijeliti administratorska ovlaštenja. Osim toga, ima pristup svim korisnicima, može mijenjati sadržaj i brisati korisnike. Administrator ima uvid u sve dostave i njihove osnovne podatke, te može označiti da je dostava plaćena nakon što korisnik izvrši uplatu. Svaki artikal pripada određenoj kategoriji, a administrator može dodavati, brisati i uređivati kategorije. Takođe, ima mogućnost dodavanja novih artikala, brisanja i uređivanja postojećih. Administrator može svakom artiklu dodijeliti dodatne veličine i prelive u zavisnosti od specifičnosti artikla.

Aplikacija je responzivna, što znači da se može koristiti na uređajima svih veličina. Ova funkcionalnost je postignuta uz pomoć Flexbox-a, koji omogućava fleksibilno raspoređivanje elemenata unutar korisničkog interfejsa. Za vizuelni izgled aplikacije korišćen je Tailwind CSS, što omogućava brzo i efikasno stilizovanje elemenata bez potrebe za pisanjem opsežnih CSS pravila. Ova kombinacija tehnologija obezbeđuje optimalno korisničko iskustvo na mobilnim telefonima, tabletima i desktop računarima, prilagođavajući se različitim veličinama ekrana.

Administrator:

username:vladimirelek@gmail.com password:12345678

Korisnik:

username:stefanlalovic@gmail.com password:12345678
