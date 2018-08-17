/*jslint node: true, browser: true */
"use strict";
/*global confirm,DOMParser*/
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function ConvertorModel() {
    var value = 0,
        rateFrom = 0,
        rateTo = 0,
        commission = 0,
        newValue = 0,
        selectFrom = document.getElementById('currencyFrom'),
        selectTo = document.getElementById('currencyTo');

    this.updateRates = function () {
         //initialize the AJAX request
        var req = new XMLHttpRequest();

        req.open('GET', 'https://devweb2016.cis.strath.ac.uk/~aes02112/ecbxml.php', true);
        //track the states of the request
        req.onreadystatechange = function () {
            var DONE = 4, OK = 200,    // readystate 4 =the request is done; status 200 = successful return
                parser = new DOMParser(),
                txt, i, xmlDoc,
                appCache = window.applicationCache,
                euroOptionFrom, euroOptionTo,
                optionFrom, optionTo;

            if (req.readyState === DONE && req.status === OK) {
                //checking for updated manifest /appcache file
                appCache.addEventListener('updateready', function () {
                    if (appCache.status == window.applicationCache.UPDATEREADY) {
                      // Browser downloaded a new app cache. Ask for confirmation and load the new data
                        if (confirm('New rates available. Would you like to load them?')) {
                            window.location.reload();
                        }
                    }
                    //otherwise manifest didn't change. Nothing new.            
                }, false);
                //adding the EUR option
                euroOptionFrom = document.createElement("option");
                euroOptionTo = document.createElement("option");

                euroOptionFrom.innerHTML = "EUR";
                euroOptionFrom.value = 1;
                selectFrom.appendChild(euroOptionFrom);
                euroOptionTo.innerHTML = "EUR";
                euroOptionTo.value = 1;
                euroOptionTo.selected = "selected";
                selectTo.appendChild(euroOptionTo);
                //parsing the xml file
                txt = req.responseText; //keeping the returned text
                xmlDoc = parser.parseFromString(txt, "text/xml");
                for (i = 2; i < 33; i++) {
                    //creating options for each currency
                    optionFrom = document.createElement('option');
                    optionTo = document.createElement('option');

                    optionFrom.innerHTML = xmlDoc.getElementsByTagName("Cube")[i].getAttribute("currency");
                    optionFrom.value = xmlDoc.getElementsByTagName("Cube")[i].getAttribute("rate");
                    optionTo.innerHTML = xmlDoc.getElementsByTagName("Cube")[i].getAttribute("currency");
                    optionTo.value = xmlDoc.getElementsByTagName("Cube")[i].getAttribute("rate");
                    //making GBP the selected currency from
                    if (xmlDoc.getElementsByTagName("Cube")[i].getAttribute("currency") === "GBP") {
                        optionFrom.selected = "selected";
                    }
                    selectFrom.appendChild(optionFrom);
                    selectTo.appendChild(optionTo);
                    //storing the date and rates into localStorage
                    localStorage.setItem("date", xmlDoc.getElementsByTagName("Cube")[1].getAttribute("time"));
                    localStorage.setItem(xmlDoc.getElementsByTagName("Cube")[i].getAttribute("currency"), xmlDoc.getElementsByTagName("Cube")[i].getAttribute("rate"));
                }
            }
        };
        req.send(null); //sending the request to website
    };
    this.addToDisplay = function (val) {
        if (value < 10000000) { //to accept max 8digit numbers
            value = (value * 10) + val;
        }
    };
    this.getCurrentValue = function () {
        return value;
    };
    this.getToCurrency = function () {
        return selectTo.options[selectTo.selectedIndex].innerHTML;
    };
    this.clearValue = function () {
        value = 0;
    };
    this.setRateFrom = function (r) {
        rateFrom = r;
        localStorage.setItem("RateFrom", rateFrom);
    };
    this.setRateTo = function (r) {
        rateTo = r;
        localStorage.setItem("RateTo", rateTo);
    };
    this.setCommissionRate = function (com) {
        commission = com;
        localStorage.setItem("Comission", commission);
    };
    this.calculateExchange = function () {
        if (rateFrom == 1) { // currency from is EUR
            newValue = (value * rateTo) * (1 + (commission / 100));
            //checking if currency to is JPY or KRW to convert it with no cents
            if (this.getToCurrency() == "JPY" || this.getToCurrency() == "KRW") {
                return newValue.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
            }
        } else if (rateTo == 1) { // currency to is EUR
            newValue = (value / rateFrom) * (1 + (commission / 100));
        } else if (rateFrom == rateTo) { //the currencies are the same
            newValue = value;
        } else if (rateFrom != 1 && rateTo != 1) { //different currencies other than EUR
            newValue = ((value / rateFrom) * rateTo) * (1 + (commission / 100));
            //checking if currency to is JPY or KRW to convert it with no cents
            if (this.getToCurrency() == "JPY" || this.getToCurrency() == "KRW") {
                return newValue.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
            }
        }
        if (newValue == 0) { //if result value is zero give it back
            return newValue;
        }
        if (value==newValue) { //intial value and resulting are the same
            //used replace() to add commas after three digits
            return newValue.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
        }
        return newValue.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    };
}

