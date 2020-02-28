<template>
    <lq-v-form name="_test">
        <lq-v-radio-group v-bind="$attrs">
            <v-radio
                label="Red"
                color="red"
                :value="value"
              ></v-radio>
        </lq-v-radio-group>
    </lq-v-form>
</template>
<script>
export default {
    props: {
        formName: String,
        value: {
            default: () => 'red'
        }
    }
};
</script>