<template>
<div class="outer">
  <div class="filterContainer">
    <var-input placeholder="请输入查询关键字" clearable v-model="keywords" @clear="resetSearch" />
    <br />
    <var-button @click="searchArticleList">查询</var-button>
  </div>
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
        <div v-else />
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
  <var-back-top :duration="600" />
</template>

<script setup>
import { postFetchArticleList, postSearchArticleList } from  './service';
import { onMounted, ref } from 'vue';
const list = ref([]);
const keywords = ref('');
async function fetchArticleList() {
  const res = await postFetchArticleList();
  console.log(res);
  list.value = res.data;
}
onMounted(() => {
  fetchArticleList();
})

const searchArticleList = async () => {
  const params = keywords.value;
  console.log(params);
  if (!params) return;
  const res = await postSearchArticleList({ keywords: params })
  console.log(res);
  if (res.code === 200) {
    list.value = res.data;
  }
}

const resetSearch = () => {
  fetchArticleList();
}

</script>

<style scoped>
.filterContainer {
  margin-top: 40px;
  margin-bottom: 20px;
}
.outer {
  width: 80%;
  margin: 0 auto;
  overflow: hidden;
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
  margin-right: 6px;
  color: #fff;
  background: rgb(0, 150, 136);
  font-size: 14px;
  border: 1px solid rgba(0, 150, 136, .6);
  padding: 0 4px;
  border-radius: 2px;
  /*line-height: 1;*/
}
.tagBox:nth-last-child(1) {
  margin-right: 0;
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
