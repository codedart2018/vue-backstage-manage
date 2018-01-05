<!--正常菜单-->
<template>
  <Menu ref="sideMenu" :active-name="$route.name" :open-names="openNames" :theme="menuTheme" width="auto" accordion>
    <template v-for="(item, index) in menuList">
      <MenuItem v-if="item.children.length <= 1" :name="item.name" :key="item.path">
        <div class="title-box" @click="goTo(item)">
          <Icon :type="item.icon" :size="iconSize"></Icon>
          <span class="layout-text">{{item.title}}</span>
        </div>
      </MenuItem>
      <Submenu v-if="item.children.length > 1" :name="item.name" :key="item.path">
        <template slot="title">
          <Icon :type="item.icon" :size="iconSize"></Icon>
          <span class="layout-text">{{item.title}}</span>
        </template>
        <template v-for="child in item.children">
          <MenuItem :name="child.name" :key="child.name">
            <div class="title-box" @click="goTo(child)">
              <Icon :type="child.icon" :size="iconSize"></Icon>
              <span class="layout-text">{{child.title}}</span>
            </div>
          </MenuItem>
        </template>
      </Submenu>
    </template>
  </Menu>
</template>

<script>
  import {mapActions} from 'vuex';
  export default{
    name: 'sideMenu',
    props: {
      menuList: Array,
      iconSize: Number,
      menuTheme: {
        type: String,
        default: 'dark'
      },
      openNames: {
        type: Array
      }
    },
    methods: {
      ...mapActions(['addNavigationTabs']),
      //编程式导航
      goTo(params) {
        //this.$router.push({name: params.name, params: {userId: 123}, query: {plan: 'private'}});
        this.addNavigationTabs(params);
        this.$router.push({name: params.name});
      }
    },
    updated () {
    	//iview 没有提供 关闭菜单方法 下周天放假的时候 自己修改来打包
      this.$nextTick(() => {
      });
    },
    components: {
    },
    mounted() {
    	//console.log(this.$route.name);
    }
  };
</script>


