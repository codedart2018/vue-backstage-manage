<style src="@/assets/styles/layout/tabs-menu.less" lang="less" scoped></style>
<template>
  <div class="tabs-menu">
    <div class="leftward">
      <i class="icon-font icon-arrow-left"></i>
    </div>
    <div class="center-slide">
      <div ref="scrollDom" class="tags-outer-scroll-con" @DOMMouseScroll="handleScroll" @mousewheel="handleScroll" >
        <div ref="scrollBody" class="tags-inner-scroll-body" :style="{left: tagBodyLeft + 'px'}">
          <transition-group name="taglist-moving-animation">
            <Tag
              type="dot"
              v-for="(item, index) in pageTagsList"
              ref="tagsPageOpened"
              :key="item.name"
              :name="item.name"
              @on-close="closePage"
              @click.native="linkTo(item)"
              :closable="item.name==='home_index'?false:true"
              :color="item.children?(item.children[0].name===currentPageName?'blue':'default'):(item.name===currentPageName?'blue':'default')"
            >{{item.name}}</Tag>
          </transition-group>
        </div>
      </div>
    </div>
    <div class="rightward">
      <div class="arrow-box">
        <i class="icon-font icon-arrow-right"></i>
      </div>
      <div class="drop-down" :class="{'drop-down-hover': isOpenMore}" @mouseover="tabsMorePlan" @mouseout="tabsMorePlan">
        <Icon type="arrow-down-b"></Icon>
        <div class="down-box" :class="{'down-box-slide': isOpenMore}">
          <ul class="drop-down-ul">
            <li class="reload-page" @click="refresh">
              <Icon type="refresh"></Icon>
              <span>刷新当前</span>
            </li>
            <li class="reload-page">
              <Icon type="close"></Icon>
              <span>关闭其它</span>
            </li>
            <li class="reload-page" role="presentation">
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
  import {Tag, Icon, Dropdown, Button} from 'iview';
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
        default: (item) => {
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
      closePage (name) {
        let pageOpenedList = this.$store.state.app.pageOpenedList;
        let lastPageObj = pageOpenedList[0];
        if (this.currentPageName === name) {
          let len = pageOpenedList.length;
          for (let i = 1; i < len; i++) {
            if (pageOpenedList[i].name === name) {
              if (i < (len - 1)) {
                lastPageObj = pageOpenedList[i + 1];
              } else {
                lastPageObj = pageOpenedList[i - 1];
              }
              break;
            }
          }
        }
        this.$store.commit('removeTag', name);
        this.$store.commit('closePage', name);
        pageOpenedList = this.$store.state.app.pageOpenedList;
        localStorage.pageOpenedList = JSON.stringify(pageOpenedList);
        if (this.currentPageName === name) {
          this.linkTo(lastPageObj);
        }
      },
      linkTo (item) {
        let routerObj = {};
        routerObj.name = item.name;
        if (item.argu) {
          routerObj.params = item.argu;
        }
        if (item.query) {
          routerObj.query = item.query;
        }
        if (this.beforePush(item)) {
          this.$router.push(routerObj);
        }
      },
      handleTagsOption (type) {
        if (type === 'clearAll') {
          this.$store.commit('clearAllTags');
          this.$router.push({
            name: 'home_index'
          });
        } else {
          this.$store.commit('clearOtherTags', this);
        }
        this.tagBodyLeft = 0;
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
      this.refsTag = this.$refs.tagsPageOpened;
      setTimeout(() => {
        this.refsTag.forEach((item, index) => {
          if (this.$route.name === item.name) {
            let tag = this.refsTag[index].$el;
            this.moveToView(tag);
          }
        });
      }, 1);  // 这里不设定时器就会有偏移bug
    },
    watch: {
      '$route' (to) {
      	let currentRouter = this.$route;
        console.log(currentRouter);
        this.currentPageName = to.name;
        this.$nextTick(() => {
          this.refsTag.forEach((item, index) => {
            if (to.name === item.name) {
              let tag = this.refsTag[index].$el;
              this.moveToView(tag);
            }
          });
        });
        this.tagsCount = this.tagsList.length;
      }
    },
    components: {
      'Tag': Tag,
      'Icon': Icon,
      'IButton': Button,
      'Dropdown': Dropdown,
      'DropdownMenu': Dropdown.Menu,
      'DropdownItem': Dropdown.Item
    }
  };
</script>
