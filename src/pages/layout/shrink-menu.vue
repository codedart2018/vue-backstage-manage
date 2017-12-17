<!--正常菜单-->
<template>
  <IMenu ref="sideMenu" :active-name="$route.name" :open-names="openNames" :theme="menuTheme" width="auto" accordion>
    <template v-for="(item, index) in menuList">
      <IMenuItem v-if="item.children.length <= 1" :name="item.name" :key="item.path">
        <div class="title-box" @click="demo">
          <Icon :type="item.icon" :size="iconSize" :key="item.path"></Icon>
          <span class="layout-text" :key="item.path">{{item.title}}</span>
        </div>
      </IMenuItem>
      <ISubmenu v-if="item.children.length > 1" :name="item.name" :key="item.path">
        <template slot="title">
          <Icon :type="item.icon" :size="iconSize"></Icon>
          <span class="layout-text">{{item.title}}</span>
        </template>
        <template v-for="child in item.children">
          <IMenuItem :name="child.name" :key="child.name">
            <div class="title-box" @click="demo">
              <Icon :type="child.icon" :size="iconSize" :key="child.name"></Icon>
              <span class="layout-text" :key="child.name">{{child.title}}</span>
            </div>
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
        //编程式导航
        this.$router.push({name: name, params: {userId: 123}, query: {plan: 'private'}});
      },
      //编程式导航
      goTo(path) {
      },
      demo() {
      	console.log(123);
      }
    },
    updated () {
    	//iview 没有提供 关闭菜单方法 下周天放假的时候 自己修改来打包
      this.$nextTick(() => {
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


