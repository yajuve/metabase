/* eslint-disable flowtype/require-valid-file-annotation */

import { DATABASE_ID, ORDERS_TABLE_ID, metadata } from "metabase/__support__/sample_dataset_fixture";
import Question from "metabase-lib/lib/Question";
import SummarizeBySegmentMetricAction from "./SummarizeBySegmentMetricAction"
import { mount } from "enzyme";

const question = Question.create({ databaseId: DATABASE_ID, tableId: ORDERS_TABLE_ID, metadata })

describe("SummarizeBySegmentMetricAction", () => {
    describe("onChangeCardAndRun", async () => {
        it("should be called for 'Count of rows' choice", async () => {
            const action = SummarizeBySegmentMetricAction({ question })[0]

            await new Promise((resolve, reject) => {
                const popover = action.popover({
                    onClose: () => {},
                    onChangeCardAndRun: async (card) => {
                        expect(card).toBeDefined();
                        resolve();
                    }
                })

                const component = mount(popover);
                component.find('.List-item-title[children="Count of rows"]').simulate("click");
            })
        })

        it("should be called for 'Sum of ...' => 'Subtotal' choice", async () => {
            const action = SummarizeBySegmentMetricAction({ question })[0]

            await new Promise((resolve, reject) => {
                const popover = action.popover({
                    onClose: () => {},
                    onChangeCardAndRun: async (card) => {
                        expect(card).toBeDefined();
                        resolve()
                    }
                })

                const component = mount(popover);
                component
                    .find('.List-item-title[children="Sum of ..."]')
                    .simulate("click");
                console.log(component.debug());

                component
                    .find('.List-item-title[children="Subtotal"]')
                    .simulate("click");
            })
        })
    })
});