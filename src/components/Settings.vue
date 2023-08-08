<template>
  <div class="content-Settings-block d-flex flex-column justify-content-center">
    <div class="header-settings position-relative d-flex align-items-center justify-content-between mb-3">
      <p class="error" v-if="this.err !== ''">{{ err }}</p>
      <span class="Title">Settings</span>
      <button @click="this.$emit('close-settings')" class="ico__Close"><img src='@/assets/icons/close.svg' alt="close"></button>
    </div>
    <draggable class="drag-cities mb-1" v-model="cities" :item-key="getKey" v-if="cities.length > 0" @end="onDragEnd">
      <div class="block-city d-flex align-items-center justify-content-between p-2 mb-2" v-for="(city, index) in cities" :key="getKey(city)">
        <span class="handle">☰</span>
        <span class="fw-bold">{{ city }}</span>
        <a class="d-flex align-items-center" href="#" @click.prevent="removeCity(index)"><img class="Delete__Ico" src='@/assets/icons/delete.png' alt="delete"></a>
      </div>
    </draggable>
    <div class="input-group input-group-sm mb-3">
      <div class="input-group-prepend">
        <button class="btn btn-outline-secondary me-2" type="button" @click.prevent="addCity(newCity)">Add</button>
      </div>
      <input v-model="newCity" type="text" class="form-control" placeholder="Add new city" aria-describedby="Add new city">
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next'
import { mapState, mapActions } from 'vuex';

export default defineComponent({
  components: {
    draggable: VueDraggableNext,
  },
  props:{
    cityPushArray: String
  },
  data() {
    return {
      newCity: '',
      err: ''
    };
  },
  computed: {
    ...mapState(['cities']),
  },
  beforeMount() {
    this.addCityToStore(this.cityPushArray);
  },
  methods: {
    ...mapActions(['addCity', 'removeCity', 'reorderCities']),
    onDragEnd(event) {
      this.reorderCities({ newIndex: event.newIndex, oldIndex: event.oldIndex });
    },
    addCityToStore(city) {
      if (this.newCity.trim() !== '') {
        this.addCity(city).then((res)=> {
          if(!res) {
            this.err = 'City already exists in the list.';
          }
        });
        this.newCity = '';
      }
    },
    getKey(item) {
      return item.id;
    },
  },
});
</script>

<style scoped lang="scss">
.Title {
  font-weight: 600;
}
.header-settings {
  p.error {

  }
}
.content-Settings-block {
  .drag-cities {
    .block-city {
      background: #bbbbbb;
    }
  }
}
.ico__Close {
  transition: all .3s ease;

  img {
    width: 20px;
    height: 20px;
  }

  &:hover {
    opacity: .7;
  }
}

.Delete__Ico {
  width: 20px;
}
</style>
