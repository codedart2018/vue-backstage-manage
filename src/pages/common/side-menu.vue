<!--正常菜单-->
<template>
  <IMenu ref="sideMenu" :active-name="$route.name" :open-names="openNames" :theme="menuTheme" width="auto" @on-select="changeMenu" accordion>
    <template v-for="(item, index) in menuList">
      <IMenuItem v-if="item.children.length <= 1" :name="item.name" :key="item.path">
        <Icon :type="item.icon" :size="iconSize" :key="item.path"></Icon>
        <span class="layout-text" :key="item.path">{{item.name}}</span>
      </IMenuItem>

      <ISubmenu v-if="item.children.length > 1" :name="item.name" :key="item.path">
        <template slot="title">
          <Icon :type="item.icon" :size="iconSize"></Icon>
          <span class="layout-text">{{item.name}}</span>
        </template>
        <template v-for="child in item.children">
          <IMenuItem :name="child.name" :key="child.name">
            <Icon :type="child.icon" :size="iconSize" :key="child.name"></Icon>
            <span class="layout-text" :key="child.name">{{child.name}}</span>
          </IMenuItem>
        </template>
      </ISubmenu>
    </template>
  </IMenu>
</template>

<script>
  import {Icon, Menu} from 'iview';
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
      changeMenu (name) {
        this.$emit('on-change', name);
      }
    },
    updated () {
    	//iview 没有提供 关闭菜单方法 下周天放假的时候 自己修改来打包
      this.$nextTick(() => {
        //this.activeName.push();
        this.openNames = 'haha';
        if (this.$refs.sideMenu) {
          this.$refs.sideMenu.updateOpened();
          this.$refs.sideMenu.updateActiveName();
        }
      });
    },
    components: {
      'Icon': Icon,
      'IMenu': Menu,
      'ISubmenu': Menu.Sub,
      'IMenuItem': Menu.Item
    },
    mounted() {
    	//console.log(this.$route.name);
    }
  };
</script>
