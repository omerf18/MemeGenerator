// save to local storage
function saveToStorage(key, val) {
    var str = JSON.stringify(val);
    localStorage.setItem(key, str)
}

// load from local storage
function loadFromStorage(key) {
    var str = localStorage.getItem(key);
    var val = JSON.parse(str)
    return val;
}
