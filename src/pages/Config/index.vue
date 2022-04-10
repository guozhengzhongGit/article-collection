<template>
  <div class="container">
      <var-tabs v-model:active="active" elevation
                color="#2979ff"
                active-color="#fff"
                inactive-color="hsla(0, 0%, 100%, .6)">
        <var-tab v-for="tab of tabs" :key="tab.key" :name="tab.key">{{ tab.name }}</var-tab></var-tabs>
    <div class="configTag" v-if="active === 1">
      <div class="formOuter">
        <var-form ref="tagForm">
          <var-input placeholder="请输入标签名" :maxlength="20" v-model="tagInfo.tagName" :rules="[v => !!v || '标签名不能为空']" />
        </var-form>
        <div class="saveBtn">
          <var-button :loading="tagInfo.loading" type="primary" loading-type="wave" @click="createTag()">
            新建标签
          </var-button>
        </div>
      </div>
      <div class="tagList">
        <var-button
            color="linear-gradient(to right, #69dbaa, #3a7afe)"
            text-color="#fff"
        >
          已有标签
        </var-button>
        <div class="tagListBox">
          <var-space v-if="tagList.length">

            <var-chip
                closable
                icon-name="delete"
                v-for="tag of tagList"
                :key="tag.tag_id"
                :color="tag.color || ''"
            >
              {{ tag.tag_name }}
            </var-chip>

          </var-space>
          <var-card
              v-else
              description="暂无数据"
          />
        </div>
      </div>
    </div>
    <div class="configPlatform" v-if="active === 2">
      <div class="formOuter">
        <var-form ref="platformForm">
          <var-input placeholder="请输入来源名（比如：掘金）" :maxlength="10" v-model="platformInfo.platformName" :rules="[v => !!v || '来源名不能为空']"/>
<!--          <var-input placeholder="请输入来源key（比如：juejin）" :maxlength="10" v-model="platformInfo.platformKey" :rules="[v => !!v || '来源key不能为空']"/>-->
        </var-form>
        <div class="saveBtn">
          <var-button :loading="platformInfo.loading" type="primary" loading-type="wave" @click="createPlatform()">
            新建来源
          </var-button>
        </div>
      </div>
      <div class="tagList">
        <var-button
            color="linear-gradient(to right, #69dbaa, #3a7afe)"
            text-color="#fff"
        >
          已有来源
        </var-button>
        <div class="tagListBox">
          <var-space v-if="platformList.length">

            <var-chip
                closable
                icon-name="delete"
                v-for="platform of platformList"
                :key="platform.id"
            >
              {{ platform.platform_name }}
            </var-chip>

          </var-space>
          <var-card
              v-else
              description="暂无来源"
          />
        </div>
      </div>
    </div>
    <var-snackbar :type="snackbar.type" v-model:show="snackbar.show">{{ snackbar.resInfo }}</var-snackbar>
    </div>
</template>

<script setup>
import {reactive, ref, onMounted} from 'vue';
import { postCreateTag, getTagList, postFetchPlatformList, postCreatePlatform } from './service';
const tabs = [
  {
    name: '配置标签',
    key: 1,
  },
  {
    name: '配置来源',
    key: 2
  }
]

const active = ref(1);
const tagList = ref([]);
const platformList = ref([]);
const tagForm = ref(null);
const platformForm = ref(null);
const  snackbar = reactive({
  show: false,
  resInfo: '',
  type: 'info',
})
const tagInfo = reactive({
  loading: false,
  tagName: ''
});

const platformInfo = reactive({
  loading: false,
  platformName: '',
  // platformKey: ''
})

const fetchTagList = async () => {
  const res = await getTagList();
  if (res.code === 200) {
    tagList.value = res.data;
  }
}

const fetchPlatformList = async () => {
  const res = await postFetchPlatformList();
  if (res.code === 200) {
    platformList.value = res.data;
  }
}

async function createTag() {
  const validateRes = await tagForm.value.validate();
  console.log('tagForm 的验证结果', validateRes);
  if (!validateRes) return;
    tagInfo.loading = true
  const res = await postCreateTag({ tag_name: tagInfo.tagName });
  tagInfo.loading = false;
  tagInfo.tagName = '';
  await fetchTagList()
}

async function createPlatform() {
  const validateRes = await platformForm.value.validate();
  if (!validateRes) return;
  const res = await postCreatePlatform({ platform_name: platformInfo.platformName });
  console.log(res);
  if (res.code === 200) {
    snackbar.show = true;
    snackbar.resInfo = '创建成功';
    snackbar.type = 'success';
    await fetchPlatformList();
  } else {
    snackbar.show = true;
    snackbar.resInfo = res.data;
    snackbar.type = 'warning';
  }
  platformInfo.loading = false;
  platformInfo.platformName = '';
}

onMounted(() => {
  fetchTagList();
  fetchPlatformList();

})
</script>

<style scoped>
.container {
  width: 90%;
  margin: 0 auto;
}
.formOuter {
  margin-top: 16px;
}
.tagListBox {
  margin-top: 20px;
}
.tagList {

}
.saveBtn {
  margin-top: 10px;
  text-align: right;
}
</style>
