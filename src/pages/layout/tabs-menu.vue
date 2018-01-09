<style src="@/assets/styles/layout/tabs-menu.less" lang="less" scoped></style>
<template>
  <div class="tabs-menu">
    <div class="leftward">
      <i class="icon-font icon-weibiaoti81"></i>
    </div>
    <div class="center-slide">
      <div ref="scrollDom" class="tags-outer-scroll-con" @DOMMouseScroll="handleScroll" @mousewheel="handleScroll">
        <div ref="scrollBody" class="tags-inner-scroll-body" :style="{left: tagBodyLeft + 'px'}">
          <transition-group name="taglist-moving-animation">
            <Tag
              type="dot"
              v-for="(item, index) in pageTagsList"
              ref="tagsPageOpened"
              :key="item.name"
              :name="item.name"
              @on-close="closePage"
              @click.native="goTo(item)"
              :closable="true"
              :color="item.name === currentPageName ? 'blue' : 'default'"
            >{{item.title}}
            </Tag>
          </transition-group>
        </div>
      </div>
    </div>
    <div class="rightward">
      <div class="arrow-box">
        <i class="icon-font icon-weibiaoti8"></i>
      </div>
      <div class="drop-down" :class="{'drop-down-hover': isOpenMore}" @mouseover="tabsMorePlan"
           @mouseout="tabsMorePlan">
        <Icon type="arrow-down-b"></Icon>
        <div class="down-box" :class="{'down-box-slide': isOpenMore}">
          <ul class="drop-down-ul">
            <li class="reload-page" @click="refresh">
              <Icon type="refresh"></Icon>
              <span>刷新当前</span>
            </li>
            <li class="reload-page" @click="closeChose('other')">
              <Icon type="close"></Icon>
              <span>关闭其它</span>
            </li>
            <li class="reload-page" @click="closeChose('all')">
              <Icon type="power"></Icon>
              <span>关闭所有</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
  export default {
    name: 'tagsPageOpened',
    data () {
      return {
        isOpenMore: false,
        currentPageName: this.$route.name,
        tagBodyLeft: 0,
        refsTag: [],
        tagsCount: 1
      };
    },
    props: {
      pageTagsList: Array,
      beforePush: {
        type: Function,
        default: () => {
          return true;
        }
      }
    },
    computed: {
      tagsList () {
        return this.pageTagsList;
      }
    },
    methods: {
      //显示菜单
      tabsMorePlan () {
        this.isOpenMore = !this.isOpenMore;
      },
      //刷新当前页面
      refresh() {
        this.$router.go(0);
      },
      //关闭标签页面
      closePage (e, name) {
        let pageOpenedList = this.$store.state.NavigationTags.tagMenuList;
        let len = pageOpenedList.length;
        let lastTagObj = pageOpenedList[0];
        if (this.currentPageName === name) {
          for (let i = 0; i < len; i++) {
            if (pageOpenedList[i].name === name) {
              if (i < (len - 1)) {
                lastTagObj = pageOpenedList[i + 1];
              } else {
                lastTagObj = pageOpenedList[i - 1];
              }
              break;
            }
          }
        }
        this.$store.commit('removeCurrentTag', name);
        //如果没有的时候直接跳首页了
        if (len <= 1) {
          this.$router.push({
            path: '/'
          });
        }
        if (this.currentPageName === name) {
          this.goTo(lastTagObj);
        }
      },
      //选择关闭
      closeChose(type) {
        if (type === 'all') {
          this.$store.commit('removeAllTag');
          this.$router.push({
            path: '/'
          });
        } else {
          this.$store.commit('removeOtherTag', this);
        }
        this.tagBodyLeft = 0;
      },
      //路由跳转
      goTo (item) {
        let routerObj = {};
        routerObj.name = item.name;
        if (item.params) {
          routerObj.params = item.params;
        }
        if (item.query) {
          routerObj.query = item.query;
        }
        if (this.beforePush(item)) {
        	//编程式导航
          this.$router.push(routerObj);
        }
      },
      //移动视图
      moveToView (tag) {
        if (tag.offsetLeft < -this.tagBodyLeft) {
          // 标签在可视区域左侧
          this.tagBodyLeft = -tag.offsetLeft + 10;
        } else if (tag.offsetLeft + 10 > -this.tagBodyLeft && tag.offsetLeft + tag.offsetWidth < -this.tagBodyLeft + this.$refs.scrollDom.offsetWidth - 100) {
          // 标签在可视区域
        } else {
          // 标签在可视区域右侧
          this.tagBodyLeft = -(tag.offsetLeft - (this.$refs.scrollDom.offsetWidth - 100 - tag.offsetWidth) + 20);
        }
      },
      //滚动tabs
      handleScroll(e) {
        let type = e.type;
        let delta = 0;
        if (type === 'DOMMouseScroll' || type === 'mousewheel') {
          delta = (e.wheelDelta) ? e.wheelDelta : -(e.detail || 0) * 40;
        }
        let left = 0;
        if (delta > 0) {
          left = Math.min(0, this.tagBodyLeft + delta);
        } else {
          if (this.$refs.scrollDom.offsetWidth - 100 < this.$refs.scrollBody.offsetWidth) {
            if (this.tagBodyLeft < -(this.$refs.scrollBody.offsetWidth - this.$refs.scrollDom.offsetWidth + 100)) {
              left = this.tagBodyLeft;
            } else {
              left = Math.max(this.tagBodyLeft + delta, this.$refs.scrollDom.offsetWidth - this.$refs.scrollBody.offsetWidth - 100);
            }
          } else {
            this.tagBodyLeft = 0;
          }
        }
        this.tagBodyLeft = left;
      }
    },
    mounted () {
    },
    watch: {
      '$route' (to) {
        this.currentPageName = to.name;
      }
    },
    components: {
    }
  };
</script>
