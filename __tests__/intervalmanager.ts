import IntervalTimeManager from "@/utils/intervalmanager";

test("test interval manager", async () => {
    const beforeStartFN = jest.fn();
    const afterFinishFN = jest.fn();

    const manager = new IntervalTimeManager({
        totalTime: 3000,
        stepTime: 50,
        callbackFunctions: {
            "before:start": beforeStartFN,
            "after:finish": afterFinishFN,
        },
    });

    expect(manager.estimated).toBe(0);
    expect(manager.id).toBe(0);
    expect(manager.remaning).toBe(0);
    expect(manager.params.totalTime).toBe(3000);
    expect(manager.params.stepTime).toBe(50);
    expect(manager.params.callbackFunctions).not.toBeUndefined();
    manager.start();
    expect(beforeStartFN).toHaveBeenCalledTimes(1);
    expect(manager.id).not.toBe(0);
    await new Promise(r => setTimeout(r, 1000));

    expect(manager.getPercent()).toBeLessThanOrEqual(70);

    await new Promise(r => setTimeout(r, 2500));
    expect(manager.remaning).toBe(0);
    expect(afterFinishFN).toHaveBeenCalledTimes(1);
});
