<template>
  <b-row>
    <b-col cols="12" md="6">
      <b-input-group size="lg" class="mb-2">
        <slot name="left" />
      </b-input-group>
    </b-col>
    <b-col cols="12" md="6">
      <b-input-group size="lg" class="mb-2">
        <slot name="right" />
      </b-input-group>
    </b-col>
  </b-row>
</template>
