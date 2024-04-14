#!/bin/sh


echo $1
echo $2
echo $3

foldername=$1
port=$2
dbport=$3

mkdir $foldername


export wport=$port
export dport=$dbport

envsubst < compose.yml > $foldername/compose.yml

docker exec wpdeploy sh -c "ufw allow $port"

cd $foldername
docker compose up
echo Success

