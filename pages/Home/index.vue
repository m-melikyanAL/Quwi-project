<template>
  <div class="home-page">
    <div class="home-page__header">
      <div class="home-page__header--logo-box">
        <img
          width="100%"
          height="100%"
          src="../../assets/images/quwi-logo.svg"
          alt="quwi-logo"
        />
      </div>
      <div class="home-page__header--buttons">
        <button @click="getProjects()">Projects</button>
        <button @click="logout">Logout</button>
      </div>
    </div>
    <div class="home-page__body">
      <div class="home-page__container">
        <ProjectCard
          v-for="project in projectsSuccessData"
          :key="project.id"
          :project="project"
          @openEditModal="openEditModal"
        ></ProjectCard>
      </div>
    </div>
    <EditProject
      v-if="isOpen"
      :editingProject="editingProject"
      @editProject="doEditing"
      @cancelEditing="cancel"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ProjectCard from "@/components/card/project.vue";
import EditProject from "@/components/popup/edit-project.vue";

export default {
  name: "home-page",
  head() {
    return {
      title: "Quwi - Home",
    };
  },
  data() {
    return {
      isOpen: false,
      editingProject: {},
    };
  },
  components: {
    ProjectCard,
    EditProject,
  },
  methods: {
    ...mapActions("projects", ["getProjects", "editProject"]),
    logout() {
      console.log(this.$cookies.get("token"), "before");
      this.$cookies.remove("token");
      console.log(this.$cookies.get("token"), "after");
      this.$nextTick(() => {
        this.$api.post("auth/logout");
        this.$router.push("/login");
      });
    },
    openEditModal(project) {
      this.editingProject = project;
      this.isOpen = true;
    },
    doEditing(payload) {
      this.editProject(payload);
      this.getProjects();
      this.isOpen = false;
    },
    cancel() {
      this.isOpen = false;
    },
  },
  computed: {
    ...mapGetters("projects", [
      "projectsSuccessData",
      "projectsErrorData",
      "projectsLoading",
    ]),
  },
  mounted() {
    this.getProjects();
  },
};
</script>

<style scoped lang="scss">
.home-page {
  &__header {
    height: 60px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    padding: 0 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &--logo-box {
      width: 72px;
      height: 37px;
      user-select: none;
      pointer-events: none;
    }
    &--buttons {
      display: flex;
      gap: 30px;
      button {
        transition: all 0.2s;
        text-transform: uppercase;
        color: grey;
        border: none;
        background: transparent;
        cursor: pointer;
      }
      button:hover {
        color: #2668c1;
      }
    }
  }
  &__body {
    padding-top: 30px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: calc(100vh - 90px);
    overflow-y: auto;
    background-color: #f3f3f3;
  }

  &__container {
    width: 60%;
    margin: 0 auto;

    @media only screen and (max-width: 1024px) {
      width: 80%;
    }
  }
}
</style>
