// 时间戳转日期
export function formatNewsTime(timestamp: any, type: boolean) {
  if (timestamp === 0 || timestamp == null) {
    return '';
  }
  const date = new Date(timestamp);
  const Y = `${date.getFullYear()}-`;
  const M = `${
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  }-`;
  const D = date.getDate() < 10 ? `0${date.getDate()} ` : `${date.getDate()} `;
  const H = `${date.getHours()}:`;
  const M2 = `${
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
  }:`;
  const S =
    date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
  if (type) {
    return Y + M + D;
  }
  return Y + M + D + H + M2 + S;
}

// 金额转换
export function formatmoney(num: any) {
  // 英文: K 千，M 百万， B 十亿
  if (window.localStorage.getItem('umi_locale') === 'en') {
    if (num <= 1000) {
      return num;
    }
    if (num > 1000 && num < 1000000) {
      /* 大于等于一万小于一百万 */
      return `${(num / 1000).toFixed(2)}K`;
    }
    if (num >= 1000000 && num < 1000000000) {
      /* 大于等于一百万小于十亿 */
      return `${(num / 1000000).toFixed(2)}M`;
    }
    if (num >= 1000000000) {
      return `${(num / 1000000000).toFixed(2)}B`;
    }
  } else {
    if (num < 10000) {
      return num;
    }
    if (num >= 10000) {
      return `${(num / 10000).toFixed(2)}`;
    }
  }
  return num;
}

// 金额格式化——显示千位分隔符
export function pricefmt(num: any) {
  if (num) {
    let str = num.toString();

    // 没有小数点时，在末尾补上一个小数点
    if (str.indexOf('.') === -1) {
      str += '.';
    }
    return str.replace(/(\d)(?=(\d{3})+\.)/g, '$1,').replace(/\.$/, '');
  }
  return num;
}

// 图片地址
export function conversion(val: string | undefined) {
  if (val) {
    const e = val?.split(',');
    return e[0];
  }
  return '';
}

// 去除Html格式
export function htmlreplace(val: string | undefined) {
  if (val) {
    return val?.replace(/<\/?.+?>/g, '').replace(/ /g, '');
  }
  return '';
}

// 文件大小格式化
export function sizeTostr(size: number) {
  let data = '';
  if (size < 0.1 * 1024) {
    // 如果小于0.1KB转化成B
    data = `${size.toFixed(2)}B`;
  } else if (size < 0.1 * 1024 * 1024) {
    // 如果小于0.1MB转化成KB
    data = `${(size / 1024).toFixed(2)}KB`;
  } else if (size < 0.1 * 1024 * 1024 * 1024) {
    // 如果小于0.1GB转化成MB
    data = `${(size / (1024 * 1024)).toFixed(2)}MB`;
  } else {
    // 其他转化成GB
    data = `${(size / (1024 * 1024 * 1024)).toFixed(2)}GB`;
  }
  const sizestr = `${data}`;
  const len = sizestr.indexOf('.');
  const dec = sizestr.substr(len + 1, 2);
  if (dec == '00') {
    // 当小数点后为00时 去掉小数部分
    return sizestr.substring(0, len) + sizestr.substr(len + 3, 2);
  }
  return sizestr;
}

// 获取文件后缀名
export function fileNames(name: string) {
  let ext = '';
  if (name) {
    // 获取最后一个.的位置
    const index = name.lastIndexOf('.');
    // 获取后缀
    ext = name.slice(index + 1).toLocaleUpperCase();
  }
  return ext;
}
export function xhrequest(url: any, callback: (arg0: Blob, arg1: any) => void) {
  const DownUrl = url;
  const data = fetch(DownUrl)
    .then((response) => response.blob())
    .then((res) => {
      // 获取文件格式
      const index = DownUrl.lastIndexOf('.');
      // 获取文件后缀判断文件格式
      const fileType = DownUrl.substr(index + 1);
      const blod = new Blob([res]);
      if (typeof callback === 'function') {
        callback(blod, fileType);
      }
    });
  return data;
}
