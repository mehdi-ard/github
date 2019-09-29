if (!String.prototype.repeat) {
  /*eslint no-extend-native: "off"*/
  String.prototype.repeat = function(count) {
    if (this === null)
      throw new TypeError("can't convert " + this + ' to object');

    var str = '' + this;
    // To convert string to integer.
    count = +count;
    // Check NaN
    /*eslint no-self-compare: "off"*/
    if (count !== count) count = 0;

    if (count < 0) throw new RangeError('repeat count must be non-negative');

    if (count === Infinity)
      throw new RangeError('repeat count must be less than infinity');

    count = Math.floor(count);
    if (str.length === 0 || count === 0) return '';

    // Ensuring count is a 31-bit integer allows us to heavily optimize the
    // main part. But anyway, most current (August 2014) browsers can't handle
    // strings 1 << 28 chars or longer, so:
    if (str.length * count >= 1 << 28)
      throw new RangeError(
        'repeat count must not overflow maximum string size'
      );

    var maxCount = str.length * count;
    count = Math.floor(Math.log(count) / Math.log(2));
    while (count) {
      str += str;
      count--;
    }
    str += str.substring(0, maxCount - str.length);
    return str;
  };
}

if (!Array.prototype.flat) {
  Array.prototype.flat = function() {
    var depth = arguments[0];
    depth = depth === undefined ? 1 : Math.floor(depth);
    if (depth < 1) return Array.prototype.slice.call(this);
    return (function flat(arr, depth) {
      var len = arr.length >>> 0;
      var flattened = [];
      var i = 0;
      while (i < len) {
        if (i in arr) {
          var el = arr[i];
          if (Array.isArray(el) && depth > 0)
            flattened = flattened.concat(flat(el, depth - 1));
          else flattened.push(el);
        }
        i++;
      }
      return flattened;
    })(this, depth);
  };
}
