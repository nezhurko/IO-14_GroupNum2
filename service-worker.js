/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "e0aab5b6159a02881ba8922aa9d2a2bb"
  },
  {
    "url": "assets/css/0.styles.610d4d4b.css",
    "revision": "5fc4005c643d1812e3395f954cb972cb"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.17dc7fc0.js",
    "revision": "235105471074525d1d2bdc9d1186bdf9"
  },
  {
    "url": "assets/js/11.32ba2003.js",
    "revision": "b012f550c9920cce59792eeb20924fd7"
  },
  {
    "url": "assets/js/12.f4d805b2.js",
    "revision": "45a0f424731485e8513dbf3f52453817"
  },
  {
    "url": "assets/js/13.b369ab95.js",
    "revision": "ff30346a2ae0704d1a7791e2ab06f152"
  },
  {
    "url": "assets/js/14.4fd45c58.js",
    "revision": "2826a1bfcbbdf9810af87b4f633a8390"
  },
  {
    "url": "assets/js/15.d1b2d61e.js",
    "revision": "ef5639756a2f3280e85c649af08de122"
  },
  {
    "url": "assets/js/16.af900f68.js",
    "revision": "3c14e494d441892cf2f58a9e2393b95b"
  },
  {
    "url": "assets/js/17.3fe184c5.js",
    "revision": "5962358f133dffbd250c3908116e5e7a"
  },
  {
    "url": "assets/js/18.d8070267.js",
    "revision": "ed75a869134ac19fa7e978a7cca1d4e7"
  },
  {
    "url": "assets/js/19.53f9c669.js",
    "revision": "8f489a5cca5cc135ecd985b7d99ceb03"
  },
  {
    "url": "assets/js/2.d674a461.js",
    "revision": "613eef12571b272390e4d84a5a7700fd"
  },
  {
    "url": "assets/js/20.ee9acc98.js",
    "revision": "319c7f1aa01a07b229d1554b4ceeed58"
  },
  {
    "url": "assets/js/21.af7f2682.js",
    "revision": "f0361ce5914eb4c281add7d77ff36973"
  },
  {
    "url": "assets/js/22.957d68a2.js",
    "revision": "316e6728a2f373b3c705b3fd667e7b14"
  },
  {
    "url": "assets/js/23.66186558.js",
    "revision": "e1f0d58ba2637f6609820958fae6fea5"
  },
  {
    "url": "assets/js/24.fdafa87a.js",
    "revision": "7d0fe7006ab2a18348f24637c9226957"
  },
  {
    "url": "assets/js/26.2b7d224e.js",
    "revision": "d09140fd6d4af5d21412c1e04e0338bb"
  },
  {
    "url": "assets/js/3.33d6b42d.js",
    "revision": "808ea9f2d864b4467fe90f16175227a8"
  },
  {
    "url": "assets/js/4.5d00dd71.js",
    "revision": "354b2b53903cf28623245afa41ac130d"
  },
  {
    "url": "assets/js/5.4b8fb81c.js",
    "revision": "b865b25b78848b369ebb4f7a7684bf5b"
  },
  {
    "url": "assets/js/6.19d66de0.js",
    "revision": "34e4dc8308467d77a9dc5318911ce920"
  },
  {
    "url": "assets/js/7.3906f7a7.js",
    "revision": "dbf3fe1c5b38157ad795d49e2c42bfcd"
  },
  {
    "url": "assets/js/8.e8761b22.js",
    "revision": "df02b8b825d5757e125dbe170d1555c1"
  },
  {
    "url": "assets/js/9.c0a843c2.js",
    "revision": "6fdef7e064583d735d435c9c7be58314"
  },
  {
    "url": "assets/js/app.a681592d.js",
    "revision": "1f0219c9c481db4580844eee97d3bb19"
  },
  {
    "url": "conclusion/index.html",
    "revision": "ed95ae0b665373b8e84b72a41c7bf8f2"
  },
  {
    "url": "design/index.html",
    "revision": "cbf6681a88e24f0f3d8d68110f35dc68"
  },
  {
    "url": "index.html",
    "revision": "9d3606a25d1ac03d9c43673767eff68c"
  },
  {
    "url": "intro/index.html",
    "revision": "6285909ace210103da4613ed7ad5e3d2"
  },
  {
    "url": "license.html",
    "revision": "70a2edbdcd1a16b29dc6ec11e14ab937"
  },
  {
    "url": "myAvatar.png",
    "revision": "b76db1e62eb8e7fca02a487eb3eac10c"
  },
  {
    "url": "requirements/index.html",
    "revision": "c86a7589a6b24ee289bb9d5e9ed80812"
  },
  {
    "url": "requirements/stakeholders-needs.html",
    "revision": "3bc8b450ac21895473971343e30dc077"
  },
  {
    "url": "requirements/state-of-the-art.html",
    "revision": "6dda2384e5166eaadec23b817c87ebfe"
  },
  {
    "url": "software/index.html",
    "revision": "37d11472155467eda8bd7c52a4be170c"
  },
  {
    "url": "test/index.html",
    "revision": "beb2ee84619b9ba9d4881d5028da5203"
  },
  {
    "url": "use cases/index.html",
    "revision": "bf85a0c198f8c00867dd7b1b7227d202"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
