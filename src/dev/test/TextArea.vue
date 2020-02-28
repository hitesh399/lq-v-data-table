<template>
    <lq-v-form name="_test">
        <lq-v-textarea v-bind="$attrs"/>
    </lq-v-form>
</template>
<script>
export default {
    props: {
        formName: String
    }
}
</script>