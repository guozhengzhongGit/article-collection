<template>
<div class="createOuter">
  <div class="formOuter">
  <var-form ref="form">
    <var-input
        placeholder="文章标题"
        :rules="[v => !!v || '文章标题不能为空']"
        v-model="formData.title"
    />
    <var-input
        placeholder="文章副标题"
        v-model="formData.subTitle"
    />
    <var-input
        placeholder="文章作者"
        v-model="formData.editor"
    />
    <var-input
        placeholder="文章链接"
        :rules="[v => !!v || '文章链接不能为空']"
        v-model="formData.link"
    />
    <var-select
        placeholder="文章来源"
        :rules="[v => !!v || '必选']"
        v-model="formData.platform"
    >

      <var-option v-for="v of platformList" :label="v.platform_name" :key="v.id" :value="v.id" />
    </var-select>
    <var-select
        chip
        multiple
        placeholder="文章标签"
        :rules="[(v) => v.length && v.length < 4 || '必选且最多选择三个']"
        v-model="formData.tag"
    >

      <var-option v-for="v of tagList" :label="v.tag_name" :key="v.tag_id" />
    </var-select>
  </var-form>
  </div>
  <div class="submitBtn">
    <var-button type="success" @click="validateForm()">提交信息</var-button>
  </div>
<!--  <div class="submitBtn">-->
<!--    <var-button type="primary" @click="gotoList()">查看文章</var-button>-->
<!--  </div>-->
</div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import { postFetchPlatformList, getTagList, postAddArticle } from './service';
const form = ref(null);
const tagList = ref([]);
const platformList = ref([]);

const formData = reactive({
  title: '',
  subTitle: '',
  editor: '',
  link: '',
  platform: '',
  tag: [],
})

async function validateForm () {
  const res = await this.form.validate();
  console.log(res);
  if (!res) return;
  addArticle();
}

async function addArticle() {
  const { tag, subTitle, platform, ...rest } = formData;
  const platform_name = platformList.value.find(item => item.id === platform).platform_name;
  const params = {
    ...rest,
    platform,
    sub_title: subTitle,
    tag: tag.join(','),
    platform_name,
  }
  const res = await postAddArticle(params);
  console.log(res);
  if (res.code === 200) {
    resetForm();
  }
}

const resetForm = () => {
  formData.title = '';
  formData.subTitle = '';
  formData.editor = '';
  formData.link = '';
  formData.platform = '';
  formData.tag = [];
}

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

onMounted(() => {
  fetchTagList();
  fetchPlatformList();
})

function gotoList () {
  this.$router.push('/articlelist');
}


</script>

<style scoped>
.formOuter {
  width: 90%;
  margin: 0 auto;
  text-align: left;
}
</style>
