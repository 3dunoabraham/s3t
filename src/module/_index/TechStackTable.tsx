import FlexTable from "@/dom/cell/form/FlexTable"

export function TechStackTable ({ initArray }:any) {
    return (
        <div>
            <FlexTable theArray={initArray} bools={["isIdless"]}
                config={{idKey:"id",mainKey:"id",
                headerClass:"py-1",
                    childrenArray: [
                        { key: "title", title: "Title"},
                        { key: "desc", title: "Details"},
                    ]
                }}
            />
        </div>
    )
}

export default TechStackTable