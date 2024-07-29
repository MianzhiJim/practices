<script setup>
import DataView from 'primevue/dataview';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';

const props = defineProps(['albums']);

const getSeverity = (price) => {
  if (price < 5) {
    return 'success';
  }
  else if (price >= 5 && price < 10) {
    return 'warn';
  }
  else {
    return 'danger';
  }
}

</script>

<template>
  <DataTable :value="albums" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
    <Column header="Collection Image" style="width: 25%">
      <template #body="slotProps">
        <img :src="slotProps.data.artworkUrl100" :alt="slotProps.data.collectionName" />
      </template>
    </Column>
    <Column field="collectionName" header="Name" style="width: 25%"></Column>
    <Column header="Price(USD)" style="width: 25%">
      <template #body="slotProps">
        <Tag v-if="slotProps.data.collectionPrice" :value="slotProps.data.collectionPrice" :severity="getSeverity(slotProps.data.collectionPrice)" class="absolute dark:!bg-surface-900" style="left: 4px; top: 4px"></Tag>
        <h3 v-else>N/A</h3>
      </template>
    </Column>
    <Column field="contentAdvisoryRating" header="Rating" style="width: 25%"></Column>
  </DataTable>
  <!-- <div class="card">
    <DataView :value="albums" paginator :rows="5">
      <template #list="slotProps">
        <div class="flex flex-col">
          <div v-for="(item, index) of slotProps.items" :key="index">
            <img :src="item.artworkUrl100" :alt="item.collectionName" />
            <div>{{ item.collectionName }}</div>
            <div>Price: ${{ item.collectionPrice }}</div>
            <span v-if="item.contentAdvisoryRating">Rating: {{ item.contentAdvisoryRating }}</span>
            <hr style="margin-block: 5px;">
          </div>
        </div>
      </template>
    </DataView>
  </div> -->
</template>

<style scoped>

</style>