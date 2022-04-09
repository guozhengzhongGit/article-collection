<template>
<div class="outer">
<div class="listContainer">
  <div v-for="item of list" :key="item.uuid" class="listCard">
    <var-card
        :title="item.title"
        :subtitle="item.sub_title"
        :description="'文章来源：'+ item.platform_name"
        ripple
    >
    <template #extra>
      <div class="bottom">
        <div class="author" v-if="item.editor">
          <var-icon name="card-account-details-outline"></var-icon>作者：{{ item.editor }}
        </div>
        <div class="tagOuter">
          <div class="tagBox" v-for="tag of item.tag.split(',')" :key="tag">
            {{
              tag
            }}
          </div>
        </div>
      </div>

      <a :href="item.link" target="_blank" class="link">查看原文</a>
    </template>
    </var-card>
  </div>
</div>
</div>
</template>

<script setup>
import { postFetchArticleList } from  './service';
import { onMounted, ref } from 'vue';
const list = ref([]);
async function fetchArticleList() {
  const res = await postFetchArticleList();
  console.log(res);
  list.value = res.data;
}
onMounted(() => {
  fetchArticleList();
})

</script>

<style scoped>
.outer {
  width: 90%;
  margin: 0 auto;
}
.listContainer {

}
.author {
  display: flex;
  align-items: center;
}
.bottom {
  /*height: 200px;*/
  display: flex;
  justify-content: space-between;
}
.tagOuter {
  display: flex;
  flex-wrap: wrap;
}
.tagBox {
  color: #fff;
  background: rgb(0, 150, 136);
  font-size: 14px;
  border: 1px solid rgba(0, 150, 136, .6);
  padding: 0 4px;
  border-radius: 2px;
  /*line-height: 1;*/
}
.link {
  text-align: center;
  display: block;
  margin-top: 14px;
  background-color: rgb(58, 122, 254);
  color: #fff;
  text-decoration: none;
  padding: 8px 0;
  border-radius: 8px;
}
.listCard {
  margin-bottom: 16px;
}
</style>
