<template>
    <v-app>
        <v-container fluid grid-list-xl>
            <lq-list-filter name="_test_tb">
                <lq-v-text-field id="search" />
            </lq-list-filter>

            <v-tabs v-model="tabs">
                <v-tab href="#character">Item One</v-tab>
                <v-tab href="#episodes">Item Two</v-tab>
            </v-tabs>
            <v-tabs-items v-model="tabs" class="white elevation-1">
                <v-tab-item value="character">
                    <lq-v-data-table
                        v-if="tabs==='character'"
                        total-key="data.info.count"
                        data-key="data.results"
                        table-name="_test_tb"
                        action="character"
                        :headers="headers"
                    >
                        <template v-slot:items="{index, item}">
                            <td>{{item.name}}</td>
                        </template>
                    </lq-v-data-table>
                </v-tab-item>
                <v-tab-item value="episodes">
                    <lq-v-data-table
                        v-if="tabs==='episodes'"
                        total-key="data.info.count"
                        data-key="data.results"
                        table-name="_test_tb"
                        action="episode"
                        :headers="headers"
                    >
                        <template v-slot:items="{index, item}">
                            <td>{{item.name}}</td>
                        </template>
                    </lq-v-data-table>
                </v-tab-item>
            </v-tabs-items>
        </v-container>
    </v-app>
</template>

<script>
export default {
    name: 'playgroud',
    data() {
        return {
            tabs: 'character',
            headers: [
                {
                    text: 'Name',
                    align: 'start',
                    sortable: false,
                    value: 'name'
                }
            ]
        };
    }
};
</script>

<style>
</style>
