<template>
  <div class="dev-tags-title">
    <router-link class="home-link" to="/about">
      <div class="title-wrapper">
        <span class="tag open-tag" aria-hidden="true">
          <span class="bracket">&lt;</span>
        </span>

        <span class="title-text">{{ title }}</span>

        <span class="tag close-tag" aria-hidden="true">
          <span class="bracket">/</span>
          <span class="bracket">&gt;</span>
        </span>
      </div>
    </router-link>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<style lang="scss" scoped>
@import "node_modules/vuetify/styles";
@import "node_modules/vuetify/settings";

.dev-tags-title {
  position: relative;

  .home-link {
    text-decoration: none;
    color: rgb(var(--v-theme-on-background));
    transition: color 0.3s ease;

    &:hover {
      .title-wrapper {
        transform: translateY(-2px);

        .tag {
          &.open-tag {
            transform: translateX(-4px);
          }

          &.close-tag {
            transform: translateX(4px);
          }

          .bracket {
            color: rgb(var(--v-theme-primary));
          }
        }

        .title-text {
          background-size: 100% 100%;
        }
      }
    }
  }

  .title-wrapper {
    display: inline-flex;
    align-items: center;
    font-size: 35px;
    font-weight: 500;
    font-style: italic;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 100%;
      height: 2px;
      background: rgb(var(--v-theme-primary));
      transform: scaleX(0);
      transform-origin: right;
      transition: transform 0.3s ease;
    }

    &:hover::after {
      transform: scaleX(1);
      transform-origin: left;
    }
  }

  .tag {
    display: inline-flex;
    align-items: center;
    transition: all 0.3s ease;
    position: relative;

    .bracket {
      font-weight: bold;
      color: rgba(var(--v-theme-primary), 0.8);
      transition: color 0.3s ease;

      &:first-child {
        margin-right: 1px;
      }

      &:last-child {
        margin-left: 1px;
      }
    }
  }

  .title-text {
    margin: 0 4px;
    background-image: linear-gradient(transparent 60%, rgba(var(--v-theme-primary), 0.1) 40%);
    background-size: 0% 100%;
    background-repeat: no-repeat;
    transition: background-size 0.3s ease;
    padding: 0 4px;
    font-weight: 400;
  }

  :deep(.v-theme--dark) & {
    .tag .bracket {
      text-shadow: 0 0 8px rgba(var(--v-theme-primary), 0.3);
    }
  }
}

@media #{map-get($display-breakpoints, 'sm-and-down')} {
  .dev-tags-title {
    .title-wrapper {
      font-size: 24px;
    }

    .tag {
      .bracket {
        font-size: 1.1em;
      }
    }
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dev-tags-title {
  animation: fadeInDown 0.5s ease-out forwards;
}

::selection {
  background: rgba(var(--v-theme-primary), 0.2);
  color: rgb(var(--v-theme-on-background));
}
</style>
