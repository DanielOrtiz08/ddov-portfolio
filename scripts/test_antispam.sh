#!/usr/bin/env bash
# Script para probar todos los escenarios del validador anti-spam
BASE_URL=${1:-http://localhost:3000}
API="$BASE_URL/api/contact"

run(){
  local name=$1
  local ip=$2
  local payload=$3
  echo "--- $name ---"
  curl -s -X POST "$API" \
    -H "Content-Type: application/json" \
    -H "X-Forwarded-For: $ip" \
    -d "$payload" \
    | jq -C '.' || true
  echo -e "\n"
}

# Mensaje muy corto
run "mensaje_muy_corto" "1.1.1.1" '{"name":"T","email":"a@a.com","subject":"X","message":"Hi"}'

# Menos de 3 palabras
run "menos_de_3_palabras" "1.1.1.2" '{"name":"T","email":"a@a.com","subject":"X","message":"Hola mundo"}'

# Profanidad simple (español)
run "profanidad_es" "2.2.2.2" '{"name":"T","email":"a@a.com","subject":"X","message":"Eres un cabrón y punto"}'

# Profanidad variante leet
run "profanidad_leet" "2.2.2.3" '{"name":"T","email":"a@a.com","subject":"X","message":"Eres un m4rica"}'

# Spam keywords (bitcoin)
run "spam_bitcoin" "3.3.3.3" '{"name":"Promo","email":"spam@spam.com","subject":"Offer","message":"Earn money with bitcoin airdrop clickhere"}'

# Low letter ratio
run "low_letters" "4.4.4.4" '{"name":"T","email":"a@a.com","subject":"X","message":"12345 !!!! $$$"}'

# Repetido rapido (3 envios identicos)
echo "--- repetido_rapido (3 intentos) ---"
for i in 1 2 3; do
  curl -s -X POST "$API" \
    -H "Content-Type: application/json" \
    -H "X-Forwarded-For: 9.9.9.9" \
    -d '{"name":"Rep","email":"rep@ex.com","subject":"X","message":"Mensaje repetido de prueba"}' \
    | jq -C '.' || true
  echo
  sleep 1
done

# Limite por IP (3 envios distintos)
echo "--- limite_ip (3 envios) ---"
for i in 1 2 3; do
  curl -s -X POST "$API" \
    -H "Content-Type: application/json" \
    -H "X-Forwarded-For: 5.6.7.8" \
    -d "{\"name\":\"User${i}\",\"email\":\"user${i}@ex.com\",\"subject\":\"X\",\"message\":\"Mensaje válido número ${i} con suficiente longitud y palabras\"}" \
    | jq -C '.' || true
  echo
done

# Limite por email (mismo email desde distintas IPs)
echo "--- limite_email (3 envios con mismo email desde IPs distintas) ---"
curl -s -X POST "$API" -H "Content-Type: application/json" -H "X-Forwarded-For: 10.0.0.1" -d '{"name":"E1","email":"same@ex.com","subject":"X","message":"Mensaje valido uno"}' | jq -C '.' || true
curl -s -X POST "$API" -H "Content-Type: application/json" -H "X-Forwarded-For: 10.0.0.2" -d '{"name":"E2","email":"same@ex.com","subject":"X","message":"Mensaje valido dos"}' | jq -C '.' || true
curl -s -X POST "$API" -H "Content-Type: application/json" -H "X-Forwarded-For: 10.0.0.3" -d '{"name":"E3","email":"same@ex.com","subject":"X","message":"Mensaje valido tres"}' | jq -C '.' || true

# Mensaje valido
run "mensaje_valido" "11.11.11.11" '{"name":"OK","email":"ok@ok.com","subject":"Hello","message":"Hola, tengo un proyecto y quisiera consultarte sobre un presupuesto."}'

echo "Tests completados."
