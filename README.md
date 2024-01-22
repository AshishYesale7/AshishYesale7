<img width="90%" height="900px" src="https://camo.githubusercontent.com/843604935c1a139258f4558d19239d71503612ea295d85ea9952e94dfbce9a70/68747470733a2f2f6a6f6e6272617a6572626c6f672e66696c65732e776f726470726573732e636f6d2f323031372f31322f6d656d6974696d2d70737963686f706f6d702e6a7067"/>


### Hi there 👋

# I am Ashish Yesale
Config files for my GitHub profile
 
<!--
**AshishYesale7/AshishYesale7** is a ✨ _special_ ✨ repository because its `README.md` (this file) appears on your GitHub profile.

Here are some ideas to get you started:  --> 
 



- 👋 Hi, I’m Ashish Yesale
- 👀 I’m interested in Android Development 
- 🌱 I’m currently learning B.tech CSE 
- 💞️ I’m looking to collaborate on Tech NMCOE
- 📫 How to reach me ashishyesale007@gmail.com
- 😄 Pronouns: he/him
- ⚡ Fun fact: ...
 

<script>

 /* Auto generated, hash = 2xnr98u0iux66h5q9lkxquv5q */
//TODO: Break this file down so that we can actually unit test it.
(function(window) {
  /**
  * Renders all unrendred LinkedIn Badges on the page
  */
  window.LIRenderAll = function () {
    var CALLBACK_NAME     = 'LIBadgeCallback', //Must match callback on helpers.js
        BADGE_NAMES       = '.LI-profile-badge, .LI-entity-badge',
        // TODO -- tracking param for other badge types
        TRACKING_PARAM    = 'profile-badge',
        responsesReceived = 0, //Keeps track of number of responses recieved for proper cleanup when finished
        expectedResponses = 0, //Keeps track of number of responses to expect
        scripts           = [ ], //Keeps track of scripts added for proper cleanup when finished
        childScripts      = {}, //Keeps track of child scripts to render
        badges            = Array.prototype.slice.call(document.querySelectorAll(BADGE_NAMES));

    var i, len, badge, rendered;
    for (i = 0, len = badges.length;  i < len; i++) {
      badge    = badges[i];
      rendered =  badge.getAttribute('data-rendered');
      if (!rendered) {
        expectedResponses++;
        badge.setAttribute('data-rendered', true);
        renderBadge(badge);
      }
    }

    function isCNDomain() {
      if (typeof window !== "undefined") {
        var hostName = window.location && window.location.hostname ||  '';
        return (/linkedin(-ei)?.cn$/).test(hostName);
      }

      return false;
    }

    function generateUrl(isEI) {
      var domainPrefix = isEI ? 'https://badges.linkedin-ei' : 'https://badges.linkedin';
      if (isCNDomain()) {
        return domainPrefix + ".cn/";
      }

      return domainPrefix + ".com/";
    }

    function getBadgeKeyQueryParams(badge) {
      return Array.prototype.slice.call(badge.attributes).filter(function (attr) {
        return attr.name.lastIndexOf('data-key-', 0) !== -1;
      }).map(function (attr) {
        // Most browsers automatically lowercase the attribute name when its being read
        // We are calling lowercase on it again to ensure consistency for any browsers that are lagging behind.
        return encodeURIComponent(attr.name.replace('data-', '').toLowerCase()) + '=' + encodeURIComponent(attr.value);
      });
    }

    /*
    * Renders a single badge on the page
    * @param badge: div element of badge to render
    */
    function renderBadge(badge) {
      var size       = badge.getAttribute('data-size'),
          locale     = badge.getAttribute('data-locale'),
          type       = badge.getAttribute('data-type'),
          theme      = badge.getAttribute('data-theme'),
          vanity     = badge.getAttribute('data-vanity'),
          version    = badge.getAttribute('data-version'),
          isEI       = badge.hasAttribute('data-ei'),
          entity     = badge.getAttribute('data-entity'),
          isCreatePage = badge.hasAttribute('data-iscreate'),
          uid        = Math.round(1000000 * Math.random()),
          baseUrl = generateUrl(isEI),
          queryParams = [
            'locale=' + encodeURIComponent(locale),
            'badgetype=' + encodeURIComponent(type),
            'badgetheme=' + encodeURIComponent(theme),
            'uid=' + encodeURIComponent(uid),
            'version=' + encodeURIComponent(version)
          ],
          url;

      if (version === 'v2') {
        baseUrl += 'view';
        queryParams.push('badgesize=' + encodeURIComponent(size));
        queryParams.push('entity=' + encodeURIComponent(entity));
        queryParams = queryParams.concat(getBadgeKeyQueryParams(badge));
      } else {
        baseUrl += 'profile';
        queryParams.push('maxsize=' + encodeURIComponent(size));
        queryParams.push('trk=' + encodeURIComponent(TRACKING_PARAM));
        queryParams.push('vanityname=' + encodeURIComponent(vanity));
      }

      if (isCreatePage) {
        queryParams.push('fromCreate=true');
      }

      url = baseUrl + '?' + queryParams.join('&');
      badge.setAttribute('data-uid' , uid);
      jsonp(url); //Calls responseHandler when done
    }

    /**
    * Handles a response from the server. Finds badge matching badgeUid and inserts badgeHtml there
    * @param badgeHtml: String representing contents of the badge
    * @param badgeUid: UID of the badge to target
    **/
    function responseHandler(badgeHtml, badgeUid) {
      responsesReceived ++;

      var i, badge, uid, isCreate;
      var defaultWidth = 330 // max possible width
      var defaultHeight = 300 // max possible height

      for (i = 0, len = badges.length; i < len; i++) {
        badge = badges[i];
        // isCreate needed to prevent reloading artdeco script tag
        isCreate = badge.getAttribute('data-iscreate');
        uid   = parseInt(badge.getAttribute('data-uid'), 10);
        if (uid === badgeUid) {
          var badgeMarkup = `<body>${badgeHtml}</body>`
          var iframe = document.createElement('iframe');
          iframe.onload = function() {
            var iframeBody = iframe.contentWindow.document.body;
            // 5 px buffer to avoid the badge border being cut off.
            iframe.setAttribute('height', (iframeBody.scrollHeight || defaultHeight) + 5);
            iframe.setAttribute('width', (iframeBody.scrollWidth || defaultWidth) + 5);
          };
          iframe.setAttribute('frameBorder', '0');
          iframe.style.display = 'block';
          badge.appendChild(iframe);
          iframe.contentWindow.document.open();
          iframe.contentWindow.document.write(badgeMarkup);
          iframe.contentWindow.document.close();
          replaceScriptTags(badge, isCreate);
        }
      }
      tryClean();
    }

  // These functions are needed because badge markup is added via innerHtml property which does not run script tags
  function replaceScriptTags(node, isCreate) {
    if (shouldReplaceNode(node, isCreate)) {
      node.parentNode.replaceChild(cloneScriptNode(node), node);
      childScripts[node.src] = true;
    } else {
      var i = 0,
          children = node.childNodes;
      while (i < children.length) {
        replaceScriptTags(children[i++], isCreate);
      }
    }
    return node;
  }

  function shouldReplaceNode(node, isCreate) {
    return isScriptNode(node) && !childScripts[node.src] && (!isCreate || (isCreate && !node.getAttribute('data-isartdeco')));
  }

  function isScriptNode(node) {
    return node.tagName === 'SCRIPT';
  }

  function cloneScriptNode(node){
    var script  = document.createElement("script");
    for( var i = node.attributes.length-1; i >= 0; i-- ) {
      script.setAttribute( node.attributes[i].name, node.attributes[i].value );
    }
    return script;
  }

    // Gets all incoming responses
    window[CALLBACK_NAME] = responseHandler;

    /**
    * Tries to clean added tags
    **/
    function tryClean() {
      //Clean up after all requests are done..
      //Accounts for people including script more than once
      var done = (responsesReceived >= expectedResponses && expectedResponses > 0) || responsesReceived >= badges.length;
      if (done) {
        delete window[CALLBACK_NAME];

        // remove all script tags
        scripts.map(function(script){
          document.body.removeChild(script);
        });

      }
    }

    /*
    * Makes Jsonp request, responses handles by CALLBACK_NAME
    * @param url String: url of server to make request to
    */
    function jsonp(url) {
      var script = document.createElement('script');
      script.src = url;
      scripts.push(script);
      document.body.appendChild(script);
    }
  };

  if (document.readyState === 'complete') {
    window.LIRenderAll();
  } else {
    window.addEventListener('load', window.LIRenderAll, false);
  }

})(window);

</script>

<div class="badge-base LI-profile-badge" data-locale="en_US" data-size="medium" data-theme="dark" data-type="VERTICAL" data-vanity="ashishyesale" data-version="v1"><a class="badge-base__link LI-simple-link" href="https://in.linkedin.com/in/ashishyesale?trk=profile-badge"> </a></div>
              
 
