<template>
    <lq-v-form name="_test">
        <lq-v-rating v-bind="$attrs" />
    </lq-v-form>
</template>
<script>
export default {
    props: {
        formName: String
    }
};
</script>