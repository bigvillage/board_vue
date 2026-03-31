import { createRouter, createWebHistory } from 'vue-router'
import { useLoginStore } from "@/stores/login";
import { http } from "@/utils/api";
import { storeToRefs } from "pinia";
import { useMainStore } from "@/stores/main";
import axios from "axios"
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/portal",
    },
    {
      path: "/portal",
      redirect: "/portal/home",
    },
    {
      path: "/portal/home",
      name: "home",
      component: () => import("@/views/HomeView.vue"),
      children: [],
    },
    // {
    //   path: "/vportal/application/:id",
    //   name: "application",
    //   component: () => import("@/views/ApplicationView.vue"),
    //   children: [],
    // },
    {
      path: "/vportal/login",
      name: "login",
      component: () => import("@/views/LoginView.vue"),
      // props: route => ({ fullpath: route.query.fullpath || '' })
    },
    {
      path: "/portal/error",
      name: "error",
      component: () => import("@/views/ErrorView.vue"),
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (window.location.protocol === "http:") {
    window.location.href = window.location.href.replace("http:", "https:");
    return;
  }
  document.title = to.meta.title || "NEXEN TIRE PORTAL";
  // console.log("to : ", to);
  // console.log("from : ", from);
  const mainStore = useMainStore();
  const loginStore = useLoginStore();
  const { userData, trychecksession } = storeToRefs(loginStore);
  const isValidRoute = router.hasRoute(to.name);

  if (!isValidRoute) {
    alert("없는 페이지");
    next({ name: "error" });
    return;
  } else if (to.name === "error") {
    next();
    return;
  } else if (to.name === "login") {
    if (to.query.hasOwnProperty("$")) {
      if (to.query["$"]) {
        try {
          http
            .request({ url: "/portalapi/check", method: "POST", data: { $: to.query["$"] } })
            .then(() => {
              router.push({ name: "home" });
            })
        } catch (error) {
          router.push({ name: "home" });
        }
      } else {
        router.push({ name: "home" });
      }
    } else if (import.meta.env.VITE_SSO == "true" && to?.query?.["_"] !== "1") {
      http
        .request({ url: "/portalapi/checkSSOAlive" })
        .then(({ data }) => {
          if (data && data.redirectTo) {
            let rdt = data.redirectTo;
            if (to.query.fullpath) {
              let rdto = window.location.origin + to.query.fullpath;
              try {
                rdto = rdto.replace("portalnew", "portal");
              } catch (e) { }
              console.log("rdt ==> ", rdt);
              
              // rdt += `?redirectTo=${encodeURIComponent(rdto)}`
              // rdt = "https://sso.nexentire.com/logout.do?eMateApps=app_010";
              rdt = import.meta.env.VITE_SSO_LOGOUT;
            }
            
            if(rdt.indexOf("login.do") > -1) {
              // login.do 경로부터 변경
              // rdt = `https://sso.nexentire.com/login.do?eMateApps=App_010&redirectTo=${extractRedirectTo(rdt)}`;
              rdt = `${import.meta.env.VITE_SSO_LOGIN}&redirectTo=${extractRedirectTo(rdt)}`;
            }
            console.log("### rdt 변환 값 확인", rdt);
            window.location.href = rdt;
          }
          else next();
        })
        .catch(() => {
          next();
        });
    } else {
      next();
    }
    // if (import.meta.env.VITE_SSO !== "true") {
    //   next();
    //   return;
    // } else {
    //   window.location.href = import.meta.env.VITE_SSO_LOGOUT;
    //   return;
    // }
  } else if (userData.value) {
    axios({ method: "GET", url: "/portalapi/checkSessionAlive" })
      .then(() => { trychecksession.value = true })
      .catch((error) => {
        userData.value = null;
        router.go(0);
      });
    // console.log(userData.value,111)
    if (userData.value?.isaccount == "N") {
      if (to.name == "home") {
        if (from.params.id == "nexen_technical") {
          const Date_ = new Date();
          router.push({
            name: "application",
            params: { id: "nexen_technical" },
            query: { _: Date_.getTime() },
          });
          return;
        }
        router.push({ name: "application", params: { id: "nexen_technical" } });
        return;
      }
      if (to.name == "application" && to.params.id == "nexenbbs") {
        if (from.params.id == "nexen_technical") {
          const Date_ = new Date();
          router.push({
            name: "application",
            params: { id: "nexen_technical" },
            query: { _: Date_.getTime() },
          });
          return;
        }
        router.push({ name: "application", params: { id: "nexen_technical" } });
        return;
      }
    }
    mainStore.getLanguage(mainStore.currentLanguage);
    next();
    return;
  } else {
    //! router.beforeEach 함수 내에서 직접적으로 await를 사용하는 것은 지원되지 않습니다.
    //! await로 변경 시 "Invalid navigation guard" 에러가 발생합니다.
    // 비동기 작업 수행
    http
      .request({ url: `/portalapi/portal/api/myInfo` })
      .then(async (res) => {
        const settingInfo = await mainStore.getSettingInfo(true);
        trychecksession.value = true
        if (settingInfo) {
          // res => 일반적인 데이터냐 or Error 객체냐
          if (res instanceof Error) {
            throw res;
          }
          if (res.data.result) {
            userData.value = res.data.data;
            const { comalias } = res.data.data;
            mainStore.getLanguage(mainStore.currentLanguage);
            const thememode = get_theme();
            nexen_default_css_import();
            setting_theme(thememode);
            if (userData.value._isInternship) {
              window.location.href = "/portal.nsf/mailPortal?readForm&noheader=1"
              return;
            }
            if (userData.value?.isaccount == "N") {
              if (to.name == "home") {
                if (from.params.id == "nexen_technical") {
                  const Date_ = new Date();
                  router.push({
                    name: "application",
                    params: { id: "nexen_technical" },
                    query: { _: Date_.getTime() },
                  });
                  return;
                }
                router.push({
                  name: "application",
                  params: { id: "nexen_technical" },
                });
                return;
              }
              if (to.name == "application" && to.params.id == "nexenbbs") {
                if (from.params.id == "nexen_technical") {
                  const Date_ = new Date();
                  router.push({
                    name: "application",
                    params: { id: "nexen_technical" },
                    query: { _: Date_.getTime() },
                  });
                  return;
                }
                router.push({
                  name: "application",
                  params: { id: "nexen_technical" },
                });
                return;
              }
            }
            next();
            // setStyleLinkTag(comalias, next);
            return;
          } else {
            userData.value = null;
            document.cookie = `${import.meta.env.VITE_COOKIE ?? "dswg.saerom.sid"
              }=; max-age=-1`;
            router.push({ name: "login", params: { fullpath: to.fullPath } });
            return;
          }
        } else {
          throw new Error("세팅 에러");
        }
      })
      // 폼빌더 토큰 발급 임시처리
      .then(async () => {
        const _data = {};
        _data.userId = userData.value.empcode;
        console.log(userData.value, "userData.value");
        if (import.meta.env.VITE_FORMBUILDER_USE !== "false") {
          const headers = {
            "Content-Type": "application/json",
          };
          const option = {
            method: "POST",
            url: "/builder/auth/api/onGetSsoLoginAuth",
            data: _data,
            headers,
            withCredentials: true,
          };
          try {
            const response = await http.request(option);
            if (response.status === 200) {
              if (response.data.builder_access_token !== "")
                localStorage.setItem(
                  "builder_access_token",
                  response.data.builder_access_token
                );
              if (response.data.builder_refresh_token !== "")
                localStorage.setItem(
                  "builder_refresh_token",
                  response.data.builder_refresh_token
                );
            } else {
              console.log(response.data.message);
            }
          } catch (error) {
            console.error(error);
          }
        }
      })
      .catch((err) => {
        console.error("Auth Error", err);
        document.cookie = `${import.meta.env.VITE_COOKIE ?? "dswg.saerom.sid"
          }=; max-age=-1`;
        userData.value = null;
        if (to.fullPath != "" && to.fullPath != undefined) {
          router.push({ name: "login", query: { fullpath: to.fullPath } });
        } else {
          router.push({ name: "login" });
        }
      });
  }
});

export default router
