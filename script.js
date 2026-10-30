(function () {
  function _0x423758(_0x24a783, _0x4dc36b, _0x72b7f4) {
    const _0x4b9f90 = document.getElementById(_0x24a783);
    if (!_0x4b9f90) {
      return;
    }
    _0x4dc36b.split("").forEach((_0x36f712, _0x496947) => {
      const _0x51c5f2 = document.createElement("span");
      _0x51c5f2.className = "letter" + (_0x72b7f4 ? " gold" : "");
      _0x51c5f2.textContent = _0x36f712;
      _0x51c5f2.style.animationDelay = 0.3 + _0x496947 * 0.09 + "s";
      _0x4b9f90.appendChild(_0x51c5f2);
    });
  }
  _0x423758("iWord1", "Tusar", false);
  _0x423758("iWord2", "Khan", true);
  const _0x22e75a = document.getElementById("introCanvas");
  const _0x39fd92 = _0x22e75a.getContext("2d");
  let _0x967e4b;
  let _0x49f73f;
  let _0xe5541d = [];
  function _0x58adcf() {
    _0x967e4b = _0x22e75a.width = window.innerWidth;
    _0x49f73f = _0x22e75a.height = window.innerHeight;
  }
  _0x58adcf();
  window.addEventListener("resize", _0x58adcf);
  function _0x469ea2() {
    this.x = Math.random() * _0x967e4b;
    this.y = Math.random() * _0x49f73f;
    this.z = Math.random() * 200 - 100;
    this.r = Math.random() * 1.2 + 0.2;
    this.a = Math.random() * 0.25 + 0.04;
    this.vx = (Math.random() - 0.5) * 0.28;
    this.vy = (Math.random() - 0.5) * 0.28;
    this.vz = (Math.random() - 0.5) * 0.15;
    this.va = (Math.random() - 0.5) * 0.003;
    this.scale = 1;
  }
  for (let _0x37ad20 = 0; _0x37ad20 < 55; _0x37ad20++) {
    _0xe5541d.push(new _0x469ea2());
  }
  function _0x101586() {
    _0x39fd92.clearRect(0, 0, _0x967e4b, _0x49f73f);
    _0xe5541d.forEach(_0x9e764 => {
      _0x9e764.x += _0x9e764.vx;
      _0x9e764.y += _0x9e764.vy;
      _0x9e764.z += _0x9e764.vz;
      _0x9e764.a += _0x9e764.va;
      if (_0x9e764.x < 0 || _0x9e764.x > _0x967e4b) {
        _0x9e764.vx *= -1;
      }
      if (_0x9e764.y < 0 || _0x9e764.y > _0x49f73f) {
        _0x9e764.vy *= -1;
      }
      if (_0x9e764.z < -100 || _0x9e764.z > 100) {
        _0x9e764.vz *= -1;
      }
      if (_0x9e764.a < 0.02 || _0x9e764.a > 0.3) {
        _0x9e764.va *= -1;
      }
      _0x9e764.scale = 1 + _0x9e764.z / 200;
      const _0x1d2709 = _0x9e764.r * _0x9e764.scale;
      const _0x3d686e = _0x9e764.a * (0.5 + _0x9e764.z / 200);
      _0x39fd92.beginPath();
      _0x39fd92.arc(_0x9e764.x, _0x9e764.y, _0x1d2709, 0, Math.PI * 2);
      _0x39fd92.fillStyle = "rgba(201, 168, 76," + _0x3d686e + ")";
      _0x39fd92.fill();
    });
    if (document.getElementById("intro")) {
      requestAnimationFrame(_0x101586);
    }
  }
  _0x101586();
  const _0x155312 = document.getElementById("iBarFill");
  const _0x30f764 = document.getElementById("iPct");
  const _0x485078 = document.getElementById("iSt");
  const _0x230cff = ["Initializing…", "Loading assets…", "Building UI…", "Almost ready…", "Done!"];
  let _0x108eb0 = 0;
  let _0x18ebf6 = false;
  const _0x3e81cb = setInterval(() => {
    if (_0x18ebf6) {
      return;
    }
    _0x108eb0 = Math.min(_0x108eb0 + Math.random() * 3.5 + 1.5, 99);
    _0x155312.style.width = _0x108eb0 + "%";
    _0x30f764.textContent = Math.floor(_0x108eb0) + "%";
    _0x485078.textContent = _0x230cff[Math.min(Math.floor(_0x108eb0 / 25), 3)];
  }, 55);
  setTimeout(() => {
    _0x18ebf6 = true;
    clearInterval(_0x3e81cb);
    _0x155312.style.width = "100%";
    _0x30f764.textContent = "100%";
    _0x485078.textContent = _0x230cff[4];
    setTimeout(() => {
      const _0x3938a5 = document.getElementById("intro");
      if (_0x3938a5) {
        _0x3938a5.classList.add("hide");
        setTimeout(() => _0x3938a5.remove(), 1000);
      }
    }, 450);
  }, 2900);
})();
async function loadImage() {
  document.getElementById("pImg").src =
    "https://avatars.githubusercontent.com/u/114900895?v=4";
}
loadImage();
const cur = document.getElementById("cursor");
const ring = document.getElementById("cursor-ring");
let mx = 0;
let my = 0;
let rx = 0;
let ry = 0;
if (window.matchMedia("(hover:hover)").matches) {
  document.addEventListener("mousemove", _0x3531cb => {
    mx = _0x3531cb.clientX;
    my = _0x3531cb.clientY;
    cur.style.left = mx + "px";
    cur.style.top = my + "px";
  });
  function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + "px";
    ring.style.top = ry + "px";
    requestAnimationFrame(animateRing);
  }
  animateRing();
} else {
  cur.style.display = "none";
  ring.style.display = "none";
}
const observer = new IntersectionObserver(_0x57de51 => {
  _0x57de51.forEach(_0x4f21bb => {
    if (_0x4f21bb.isIntersecting) {
      _0x4f21bb.target.classList.add("vis");
    }
  });
}, {
  threshold: 0.1
});
document.querySelectorAll(".reveal").forEach(_0x32abec => observer.observe(_0x32abec));
const barObserver = new IntersectionObserver(_0x163b03 => {
  _0x163b03.forEach(_0x1f7d2d => {
    if (_0x1f7d2d.isIntersecting) {
      _0x1f7d2d.target.style.width = _0x1f7d2d.target.dataset.w + "%";
      barObserver.unobserve(_0x1f7d2d.target);
    }
  });
}, {
  threshold: 0.3
});
document.querySelectorAll(".prof-fill").forEach(_0x229d0f => barObserver.observe(_0x229d0f));
const hamBtn = document.getElementById("hamBtn");
const navOverlay = document.getElementById("navOverlay");
function closeNav() {
  hamBtn.classList.remove("open");
  navOverlay.classList.remove("show");
  setTimeout(() => navOverlay.style.display = "none", 350);
}
window.closeNav = closeNav;
hamBtn.addEventListener("click", () => {
  if (hamBtn.classList.contains("open")) {
    closeNav();
  } else {
    hamBtn.classList.add("open");
    navOverlay.style.display = "flex";
    requestAnimationFrame(() => navOverlay.classList.add("show"));
  }
});
