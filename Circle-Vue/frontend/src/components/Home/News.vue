<script setup>
  import axios from 'axios';
  import { ref } from 'vue';
  import { useDateFormat } from '@vueuse/core';
  import { useToast } from 'primevue/usetoast';

  const apiUrl = 'http://localhost:4231/api/news';

  let stories = await axios.get(apiUrl).then(res => res.data.reverse());
  console.log(stories)

  const visible = ref(false);
  const commentList = ref([]);
  const comInput = ref('');
  const curId = ref('');

  const toast = useToast();

  function onClick(story) {
    visible.value = true;
    commentList.value = [...story.comment];
    curId.value = story._id;
    // console.log(story)
  }

  async function onSubmit() {
    // console.log(comInput.value)
    const data = {
      publisherName: 'Jim',
        content: {
            image: '',
            video: '',
            text: comInput.value,
        }
    }
    // upload comments
    axios.patch(`${apiUrl}/addComment/${curId.value}`, data)
    .then(res => {
      // console.log(res)
      toast.add({ severity: 'success', summary: 'Success', detail: 'Comment posted!', life: 3000 });
      comInput.value = '';
    })
  }
</script>

<template>
  <div class="news" v-for="story in stories">
    <Card style="width: 50rem; overflow: hidden">
      <template #title>
        <Chip :label="story.publisherName" />
      </template>
      <template #subtitle>{{ useDateFormat(story.publishedTime, 'YYYY-MM-DD HH:mm') }}</template>
      <template #content v-if="story.content">
        <p v-if="story.content.text">{{ story.content.text }}</p>
        <Image v-if="story.content.image" :src="story.content.image" alt="Img" width="350" height="250" preview />
        <Divider/>
      </template>
      <template #footer>
        <div class="footer">
          <i class="pi pi-thumbs-up">{{ story.likedIdList.length }}</i>
          <i class="pi pi-comment" @click="onClick(story)">{{ story.comment.length }}</i>
        </div>
      </template>
    </Card>
  </div>
  <div class="dialog">
    <Dialog v-model:visible="visible" modal header="Comments">
      <div class="comments" v-for="comment of commentList">
        <Card style="min-width: 50rem; margin-bottom: 1em;">
          <template #title>
            <Chip :label="comment.publisherName" />
          </template>
          <template #subtitle>{{ useDateFormat(comment.publishedTime, 'YYYY-MM-DD HH:mm') }}</template>
          <template #content>
            <p>{{ comment.content.text }}</p>
          </template>
        </Card>
      </div>
      <template #footer>
        <div class="footer">
          <InputText v-model="comInput" placeholder="Share your thoughts" style="width: 50rem;"/>
          <Button @click="onSubmit()" style="margin-left: 1em;">Submit</Button>
          <Toast />
        </div>
      </template>
    </Dialog>
  </div>
</template>

<style scoped>
  .news {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-block: 20px;
    font-family: Inter;
  }

  .footer {
    display: flex;
    align-items: end;
    justify-content: end;
  }

  i {
    margin-left: 1em;
    cursor: pointer;
  }

  .dialog {
    font-family: Inter;
  }

  .comments {
    font-family: Inter;
  }
</style>