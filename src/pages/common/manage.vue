<template>
  <div>
    <div>this is template body22</div>
    <Dropdown>
      <a href="javascript:void(0)">
        hover 触发
        <Icon type="arrow-down-b"></Icon>
      </a>
      <DropdownMenu slot="list">
        <DropdownItem>驴打滚</DropdownItem>
        <DropdownItem>炸酱面</DropdownItem>
        <DropdownItem>豆汁儿</DropdownItem>
        <DropdownItem>冰糖葫芦</DropdownItem>
        <DropdownItem>北京烤鸭</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>
<script>
  import {Dropdown} from 'iview';
  export default{
    data() {
      return {
        msg: 'hello vue'
      };
    },
    components: {
      'Dropdown': Dropdown,
      'DropdownMenu': Dropdown.Menu,
      'DropdownItem': Dropdown.Item
    }
  };
</script>
