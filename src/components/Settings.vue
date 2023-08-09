<template>
  <div class="content-Settings-block position-relative d-flex flex-column justify-content-center">
    <transition name="fade">
      <div class="err-message position-absolute" v-if="temporaryErr !== ''">
        <p class="mb-0">{{ temporaryErr }}</p>
      </div>
    </transition>
    <div class="header-settings position-relative d-flex align-items-center justify-content-between mb-3">
      <span class="Title">Settings</span>
      <button @click="this.$emit('close')" class="ico__Close"><img src='@/assets/icons/close.svg' alt="close">
      </button>
    </div>
    <div class="content-drag">
      <draggable
          tag="transition-group"
          class="drag-cities mb-1"
          v-model="cities"
          :item-key="getKey"
          v-if="cities.length > 0"
          v-bind="dragOptions"
          @start="drag = true"
          @end="onDragEnd"
      >
        <div
            class="block-city d-flex align-items-center justify-content-between p-2 mb-2"
            v-for="(city, index) in cities" :key="city.id">
          <span class="handle">☰</span>
          <span class="fw-bold">{{ city }}</span>
          <a class="d-flex align-items-center" href="#" @click.prevent="removeCity(index)">
            <img class="Delete__Ico" src='@/assets/icons/delete.png' alt="delete">
          </a>
        </div>
      </draggable>
    </div>
    <div class="footer-settings d-flex align-items-center">
      <div class="input-group input-group-sm">
        <div class="input-group-prepend">
          <button class="btn btn-outline-secondary me-2" type="button" @click.prevent="addCityToStore(newCity)">Add</button>
        </div>
        <input v-model="newCity" type="text" class="form-control" placeholder="Add new city"
               aria-describedby="Add new city">
      </div>
    </div>
  </div>
</template>

<script>
import SettingsMixin from "@/components/__include/SettingsMixin.vue";

export default {
  name: 'Settings',
  mixins: [SettingsMixin]
}
</script>

<style scoped lang="scss">

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.Title {
  font-weight: 600;
}

.err-message {
  top: -60px;
  width: 100%;
  background: #ff6767;
  padding: 1px 15px;
  border-radius: 3px;
  p {
    font-weight: 600;
  }
}

.content-Settings-block {
  .content-drag {
    height: 244.5px;
    overflow: auto;
    margin-bottom: 48.5px;

    .drag-cities {
      transition: all .3s ease-in-out;

      .block-city {
        cursor: grab;
        transition: background-color 0.3s ease;
        background: #e1e1e1;
        border-radius: 5px;

        &:active {
          cursor: grabbing;
          background-color: #f0f0f0;
        }
        a {
          transition: all .3s ease-in-out;
          &:hover {
            opacity: .7;
          }
        }
      }
    }
  }

  .footer-settings {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    background: #fff;
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
