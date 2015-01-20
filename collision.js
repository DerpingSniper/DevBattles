module.exports = function (x, y, w, h, xx, yy, ww, hh) {
    var x2 = x + w;
    var y2 = y + h;
    var xx2 = xx + ww;
    var yy2 = yy + hh;
    if (x > xx && x < xx2 && y > yy && y < yy2) {
        return true;
    } else if (x2 > xx && x2 < xx2 && y > yy && y < yy2) {
        return true;
    } else if (x > xx && x < xx2 && y2 > yy && y2 < yy2) {
        return true;
    } else if (x2 > xx && x2 < xx2 && y2 > yy && y2 < yy2) {
        return true;
    } else if (xx > x && xx < x2 && yy > y && yy < y2) {
        return true;
    } else if (xx2 > x && xx2 < x2 && yy > y && yy < y2) {
        return true;
    } else if (xx > x && xx < x2 && yy2 > y && yy2 < y2) {
        return true;
    } else if (xx2 > x && xx2 < x2 && yy2 > y && yy2 < y2) {
        return true;
    } else if (x == xx && x2 == xx2 && ((y > yy && y < yy2) || y2 > yy && y < yy2)) {
        return true;
    } else if (y == yy && y2 == yy2 && ((x > xx && x < xx2) || x2 > xx && x < xx2)) {
        return true;
    } else {
        return false;
    }
}