# The Things Network Dashboard Example

## Composition

* Node-RED runs on port 1880
* Grafana runs on port 80
* InfluxDB runs on port 8086 and is linked as host name **influxdb**

## Installation

1. Define root URL and passwords in `grafana/.env` and `influxdb/.env`
2. `% docker-compose build`
3. `% docker-compose up`
4. Open Node-RED on **http://machine:1880** and build a flow that stores data in InfluxDB
5. Open Grafana on **http://machine** and build a dashboard that retrieves data from InfluxDB

## Examples

Node-RED installs with an example flow that reads data from the MultiTech EVB and stores it in InfluxDB. Import the example from Menu > Import > Library.
