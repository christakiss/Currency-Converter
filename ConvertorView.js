/*jslint node: true, browser: true */
"use strict";
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function ConvertorView() {
    var screen = document.getElementById('display'),
        zero = document.getElementById('zero'),
        one = document.getElementById('one'),
        two = document.getElementById('two'),
        three = document.getElementById('three'),
        four = document.getElementById('four'),
        five = document.getElementById('five'),
        six = document.getElementById('six'),
        seven = document.getElementById('seven'),
        eight = document.getElementById('eight'),
        nine = document.getElementById('nine'),
        convert = document.getElementById('convert'),
        clear = document.getElementById('clear'),
        commissionRate = document.getElementById('commission'),
        selectFrom = document.getElementById('currencyFrom'),
        selectTo = document.getElementById('currencyTo'),
        footer = document.getElementById("footer");

    //setting the current value to the display
    this.setCurrentValue = function (curVal) {
        screen.innerHTML = curVal;
    };
    this.getCommissionRate = function () {
        return commissionRate.value;
    };
    this.getFromRate = function () {
        return selectFrom.options[selectFrom.selectedIndex].value;
    };
    this.getToRate = function () {
        return selectTo.options[selectTo.selectedIndex].value;
    };
    this.getFromCurrency = function () {
        return selectFrom.options[selectFrom.selectedIndex].innerHTML;
    };
    this.getToCurrency = function () {
        return selectTo.options[selectTo.selectedIndex].innerHTML;
    };
    // getting the latest date the app has updated the rates
    this.getLastUpdateDate = function () {
        if (localStorage.getItem("date")== null){
            footer.innerHTML = "Created by CL";
            return footer;
        }
        footer.innerHTML = "Created by CL- Last Updated: " + localStorage.getItem("date") + "";
        return footer;
    };
    //creating event listeners for all buttons
    this.setZeroClickCb = function (callback) {
        zero.addEventListener('click', callback);
    };
    this.setOneClickCb = function (callback) {
        one.addEventListener('click', callback);
    };
    this.setTwoClickCb = function (callback) {
        two.addEventListener('click', callback);
    };
    this.setThreeClickCb = function (callback) {
        three.addEventListener('click', callback);
    };
    this.setFourClickCb = function (callback) {
        four.addEventListener('click', callback);
    };
    this.setFiveClickCb = function (callback) {
        five.addEventListener('click', callback);
    };
    this.setSixClickCb = function (callback) {
        six.addEventListener('click', callback);
    };
    this.setSevenClickCb = function (callback) {
        seven.addEventListener('click', callback);
    };
    this.setEightClickCb = function (callback) {
        eight.addEventListener('click', callback);
    };
    this.setNineClickCb = function (callback) {
        nine.addEventListener('click', callback);
    };
    this.setClearClickCb = function (callback) {
        clear.addEventListener('click', callback);
    };
    this.setConvertClickCb = function (callback) {
        convert.addEventListener('click', callback);
    };
}
