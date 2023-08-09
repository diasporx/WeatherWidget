<script>
import {defineComponent} from 'vue';
import {VueDraggableNext} from 'vue-draggable-next'
import {mapState, mapActions} from 'vuex';

export default defineComponent({
  components: {draggable: VueDraggableNext},
  props: {cityPushArray: String},
  data() {
    return {
      drag: false,
      newCity: ''
    };
  },
  computed: {
    ...mapState(['cities', 'temporaryErr']),
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    }
  },
  beforeMount() {
    this.addCityToStore(this.cityPushArray);
  },
  methods: {
    ...mapActions(['addCity', 'removeCity', 'reorderCities']),
    onDragEnd(event) {
      this.drag = false
      this.reorderCities({newIndex: event.newIndex, oldIndex: event.oldIndex});
    },
    addCityToStore(city) {
      if (this.newCity.trim() !== '') {
        this.addCity(city)
        this.newCity = '';
      }
    },
  },
});
</script>
